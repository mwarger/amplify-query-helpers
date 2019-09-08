import * as React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Observable } from 'zen-observable-ts';

export type UndefinedGQLType<T> = T | null | undefined;

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  // console.warn('notEmpty is provided for convenience and demonstration, there are probably better alternatives.')
  return value !== null && value !== undefined;
}

export const mutation = async <
  ResultType extends {},
  VariablesType extends {} = {}
>(
  query: string,
  variables?: VariablesType
) => gqlOp<ResultType, VariablesType>(query, variables);

export const gqlOp = async <
  ResultType extends {},
  VariablesType extends {} = {}
>(
  query: string,
  variables?: VariablesType
) => {
  const { data } = (await API.graphql(graphqlOperation(query, variables))) as {
    data: ResultType;
  };
  return data;
};

type TODO = any;

export interface UseQueryType<ResultType> {
  loading: boolean;
  error: TODO;
  data: ResultType;
  refetch: () => void;
}

export const QueryHandler = <DataType extends {}>({
  data,
  loading,
  error,
  children,
  refetch,
  overlay = false,
}: {
  overlay?: React.ReactNode;
  data: DataType;
  refetch?: () => void;
  loading: boolean;
  error: { data: DataType; errors: any[] };
  children: ({
    data,
    refetch,
  }: {
    data: DataType;
    refetch?: () => void;
  }) => React.ReactNode;
}) => {
  if (error) {
    console.log('error', JSON.stringify(error.errors));
  }

  return overlay ? (
    <>
      {loading && overlay}
      {children({ data, refetch })}
    </>
  ) : (
    <>{children({ data, refetch })}</>
  );
};

export const useQuery = <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType
): UseQueryType<ResultType> => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState({} as ResultType);

  const fetchQuery = async (query: string, variables?: VariablesType) => {
    try {
      setLoading(true);
      const data = await gqlOp<ResultType, VariablesType>(query, variables);
      setData(data);
    } catch (error) {
      // console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchQuery(query, variables);
  };

  React.useEffect(() => {
    fetchQuery(query, variables);
  }, [query, JSON.stringify(variables)]);

  return {
    loading,
    data,
    error,
    refetch,
  };
};

export type AmplifyListType<ListItemType> = {
  [listKey: string]: {
    __typename: string;
    items: ListItemType[] | null;
    nextToken: UndefinedGQLType<string>;
  } | null;
};

export interface UseQueryListType<ResultType>
  extends UseQueryType<ResultType[]> {
  nextToken: UndefinedGQLType<string>;
  setToken: (token: string) => void;
}

export type UseQueryListTypeWithoutRefetch<ResultType> = Omit<
  UseQueryListType<ResultType>,
  'refetch'
>;

export const useQueryList = <
  ListItemType,
  ListQueryType extends AmplifyListType<ListItemType | null>,
  ListVariablesType extends {}
>(
  listKey: string,
  query: string,
  variables: ListVariablesType
): UseQueryListTypeWithoutRefetch<ListItemType> => {
  const [token, setToken] = React.useState<UndefinedGQLType<string>>();
  const [nextToken, setNextToken] = React.useState<UndefinedGQLType<string>>();
  const [list, setList] = React.useState<ListItemType[]>([]);

  const { data, loading, error } = useQuery<ListQueryType, ListVariablesType>(
    query,
    {
      ...variables,
      nextToken: token,
    }
  );

  React.useEffect(() => {
    setList([]);
  }, [JSON.stringify(variables)]);

  React.useEffect(() => {
    const listData = data && data[listKey];
    setList(list => {
      let updatedItems = list;
      if (listData) {
        const newList: ListItemType[] | null =
          listData && listData.items && listData.items.filter(notEmpty);
        if (newList) {
          updatedItems = updatedItems.concat(newList);
        }
        return updatedItems;
      }
      return [];
    });

    if (listData) {
      setNextToken(listData.nextToken);
    }
  }, [data, listKey]);

  return { data: list, loading, error, nextToken, setToken };
};

enum ActionType {
  'update',
  'create',
  'remove',
}

type Action<T> = { type: ActionType; payload: T };
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
  dispatch,
  itemData,
}: {
  config?: ConfigType<VariablesType>;
  dispatch?: ({ payload }: { payload: ItemType }) => void;
  itemData?: ItemType;
} = {}) => {
  function reducer(
    state: { itemData: ItemType | undefined },
    { type, payload }: Action<ItemType | undefined>
  ) {
    switch (type) {
      case ActionType.update:
        return { ...state, ...{ itemData: payload } };
      default:
        throw new Error();
    }
  }
  const [item, localDispatch] = React.useReducer(reducer, { itemData });

  React.useEffect(() => {
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

              dispatch
                ? dispatch({ payload: item })
                : localDispatch({ type: ActionType.update, payload: item });
            } catch (error) {
              console.error(
                `${error.message} - Check the key property: the current value is ${key}`
              );
            }
          },
        });
        return () => {
          sub.unsubscribe();
        };
      }
    }
    return undefined;
  }, [JSON.stringify(config)]);

  return [item];
};

export const useCrudSubscription = <
  ListItemType extends { id: string },
  VariableType extends {} = {}
>({
  listData,
  configs,
}: {
  listData: ListItemType[];
  configs: {
    updatedConfig?: ConfigType<VariableType>;
    createdConfig?: ConfigType<VariableType>;
    deletedConfig?: ConfigType<VariableType>;
  };
}) => {
  function reducer(
    state: ListItemType[],
    { type, payload }: Action<ListItemType>
  ) {
    switch (type) {
      case ActionType.update:
        return state.map(item => (item.id === payload.id ? payload : item));
      case ActionType.create:
        return [...state, payload];
      case ActionType.remove:
        return [...state.filter(item => item.id !== payload.id)];
      default:
        throw new Error();
    }
  }
  const [list, dispatch] = React.useReducer(reducer, listData);

  useSubscription<ListItemType, VariableType>({
    config: configs.updatedConfig,
    dispatch: ({ payload }) => dispatch({ type: ActionType.update, payload }),
  });

  useSubscription<ListItemType, VariableType>({
    config: configs.createdConfig,
    dispatch: ({ payload }) => dispatch({ type: ActionType.create, payload }),
  });

  useSubscription<ListItemType, VariableType>({
    config: configs.deletedConfig,
    dispatch: ({ payload }) => dispatch({ type: ActionType.remove, payload }),
  });

  return [list];
};
