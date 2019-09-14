---
title: AWS Amplify GraphQL Operations with TypeScript and Hooks - Part 4 [Subscriptions]
published: false
description: Subscriptions provide an way to easily supply real-time information in an application using GraphQL.  Let's see what they look like with AWS Amplify and how they can be made better with TypeScript and hooks!
tags: TypeScript, GraphQL, Amplify, JavaScript
series: AWS Amplify GraphQL Operations with TypeScript and Hooks
---

Next up is subscriptions. This is a fun feature of GraphQL and AppSync in general. The ability to leverage real-time data can really bring some nice UX to your apps. I tend to use it sparingly, but it's super helpful for small lists and instant feedback.

Our previous posts have built up a fairly nice set of abstractions that we can use here as well. Because of this, I'm going to paste the result at the start this time, and break it down into pieces. Grab a cup of coffee and we'll get to it.

## The Code

Here's our finished custom hook:

```typescript
type ConfigType<VariableType extends {}> = {
  query: string;
  key: string;
  variables?: VariableType;
};

export const useSubscriptionByItself = <
  ItemType extends { id: string },
  VariablesType extends {} = {}
>({
  config,
  itemData,
}: {
  config?: ConfigType<VariablesType>;
  itemData?: ItemType;
} = {}) => {
  const [item, update] = React.useState<ItemType | undefined>(itemData);

  React.useEffect(() => {
    let unsubscribe;
    if (config) {
      const { query, key, variables } = config;
      const subscription = API.graphql(graphqlOperation(query, variables));
      if (subscription instanceof Observable) {
        const sub = subscription.subscribe({
          next: payload => {
            try {
              const {
                value: {
                  data: { [key]: item },
                },
              }: {
                value: { data: { [key: string]: ItemType } };
              } = payload;

              update(item);
            } catch (error) {
              console.error(
                `${error.message} - Check the key property: the current value is ${key}`
              );
            }
          },
        });
        unsubscribe = () => {
          sub.unsubscribe();
        };
      }
    }
    return unsubscribe;
  }, [JSON.stringify(config)]);

  return [item];
};
```

There's a lot here, but our use-case is simple. Our subscription is going to handle an item. This could be something as simple as subscribing to new blog posts that are created, for example:

```typescript
const [item] = useSubscription<postFragment>({
  config: {
    key: 'onCreatePost',
    query: onCreatePost,
  },
});
```

We could also pass some variables to subscribe to a comment when it is updated:

```typescript
const [comment] = useSubscriptionByItself<
  commentFragment,
  onUpdateCommentSubscriptionVariables
>({
  itemData: comment,
  config: {
    key: 'onUpdateComment',
    query: onUpdateComment,
    variables: {
      id,
    },
  },
});
```

> The point is that we are able to take the boilerplate of `const subscription = API.graphql(graphqlOperation(query, variables));` and extract it away into something that can be re-used, as well as leaning into the convention of how AWS Amplify returns data to handle everything in a strongly-typed way.

Let's start at the top and see what's going on.

## Typing the Configuration

```typescript
type ConfigType<VariableType extends {}> = {
  query: string;
  key: string;
  variables?: VariableType;
};

export const useSubscription = <
  ItemType extends { id: string },
  VariablesType extends {} = {}
>({
  config,
  itemData,
}: {
  config?: ConfigType<VariablesType>;
  itemData?: ItemType;
} = {}) => {
```

Let's take a look at the type parameters (the things in between the angle brackets). This takes some explaining, because I start out assuming a convention. The `ItemType` represents the object that we're going to be returning and operating on in our hook. The `extends { id: string }` means that whatever object we pass in, it must have an id of type `string` as a property. This is useful, as we want a unique identifier for our object. The `itemData` used in case we want to initialize our state.

Note that I'm leveraging fragments to provide a single typed object that we can work with. Once created, the Amplify `codegen` tool will create types for your fragments that you can then use as we are in this example. You can learn more about fragments and how to use them with GraphQL [here](https://graphql.org/learn/queries/#fragments).

The second `VariableType` is going to be an object that represents any variables that we will be passing to our subscription `graphqlOperation`. This is used further down in the type declaration to the `ConfigType`. This represents the configuration that holds the subscription `query`, `variables` and `key` that we will use to establish our subscription. We'll come back to the `key` a bit later.

## The State

```typescript
const [item, update] = React.useState<ItemType | undefined>(itemData);
```

This is pretty straightforward. We use the `ItemType` parameter we passed in to type the `useState` function. This is possibly undefined, so we note that as well. If we passed in initial `itemData`, we use this as well to establish the state that will keep track of the subscription we're working with.

## The Effect

Here's the real meat of it.

```typescript
React.useEffect(() => {
  let unsubscribe;
  if (config) {
    const { query, key, variables } = config;
    const subscription = API.graphql(graphqlOperation(query, variables));
    if (subscription instanceof Observable) {
      const sub = subscription.subscribe({
        next: payload => {
          try {
            const {
              value: {
                data: { [key]: item },
              },
            }: {
              value: { data: { [key: string]: ItemType } };
            } = payload;

            update(item);
          } catch (error) {
            console.error(
              `${error.message} - Check the key property: the current value is ${key}`
            );
          }
        },
      });
      unsubscribe = () => {
        sub.unsubscribe();
      };
    }
  }
  return unsubscribe;
}, [JSON.stringify(config)]);
```

First things first, we're going to be establishing a subscription, so for an effect, we need to [clean it up](https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1) when we're done. We declare a variable that will hold the function we want to run when returning from the effect.

Next, we will check if the config exists, as it is optional. We destructure the components and will use them to construct our subscription. The next lines our important:

```typescript
  const subscription = API.graphql(graphqlOperation(query, variables));
  if (subscription instanceof Observable) {
    ...
```

The `API.graphql` call actually returns `Observable | Promise<>` - what this means is that the result will be one or the other. To get the autocomplete help that we expect (and stop TypeScript from yelling at us) we need to do what is called "type narrowing" using a [type guard](https://basarat.gitbooks.io/typescript/docs/types/typeGuard.html). We do this by using the `instanceof` keyword to check if the type is an `Observable`. I've added the `@types/zen-observable` package (`yarn add -D @types/zen-observable`) to provide the type.

## The Subscription

```typescript
const sub = subscription.subscribe({
  next: payload => {
    try {
      const {
        value: {
          data: { [key]: item },
        },
      }: {
        value: { data: { [key: string]: ItemType } };
      } = payload;

      update(item);
    } catch (error) {
      console.error(
        `${error.message} - Check the key property: the current value is ${key}`
      );
    }
  },
});
unsubscribe = () => {
  sub.unsubscribe();
};
```

We have our subscription that's returned from our graphql call, so now we need to subscribe to it. This is using what is called and observable. Last time I checked, Amplify is using the [zen-observable](https://github.com/zenparsing/zen-observable) library for the subscription implementation. Observables operate with values by returning them as streams, so you can listen for updates to the stream by supplying callbacks - in this case, `next`. Our `next` callback takes a `payload` (this will be the value of the next event in the stream) and we then do some destructuring on this value to get the underlying data we want. Amplify follows a convention for returning data in the subscriptions, so we can use this to make sure our destructuring is correct.

```typescript
const {
  value: {
    data: { [key]: item },
  },
}: {
  value: { data: { [key: string]: ItemType } };
} = payload;
```

We use the `key` we talked about earlier, as well as the `ItemType` type we passed in, to create a type and properly destructure from the nested object (in the form of `value.data[key]`). Once this data is handled, we use the `update` method from our `useState` hook to persist our state, and if anything goes wrong we log out the error.

After the callback, we assign a small arrow function to our `unsubscribe` variable that will do the work of unsubscribing from our subscription if the component the hook is used in is unmounted.

```typescript
[JSON.stringify(config)];
```

Our `useEffect` hook takes in one dependency (an object) so we'll just `stringify` it to make sure that if it's changed in any way, our hook will run again and we can re-establish the appropriate subscription.

The last line merely returns the data kept in state, so we can use it from the caller.

```typescript
return [item];
```

## The Wrap

This is, at it's core, just a wrapper over the existing Amplify tools. But for TypeScript projects, it gives you the help you can use to make sure your app is doing what you expect. The nice by-product, in my opinion, is that the API surface is more complete, while abstracting away the common bits. It's generally good process to extract these things away and avoid having `useEffect` directly in your components. This is just one little step in that direction.

But wait, what if you need to subscribe to many events? That's next up - follow me to be notified when it's published!
