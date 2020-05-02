import 'react-app-polyfill/ie11';
import * as React from 'react';
import {
  QueryHandler,
  useQuery,
  mutation,
  notEmpty,
  useSubscription,
} from '../../src';
import {
  listBlogsQuery,
  listBlogsQueryVariables,
  CreateBlogMutation,
  CreateBlogMutationVariables,
  postFragment,
  OnCreatePostSubscription,
  CreatePostMutationVariables,
} from 'src/API';
import { createBlog } from './graphql/mutations';
import Amplify from 'aws-amplify';

import * as faker from 'faker';
import { oc } from 'ts-optchain';
import { listBlogs } from './graphql/custom-queries';
import { onCreatePost, onCreatePostForBlog } from './graphql/subscriptions';
import { Spinner } from './SpinnerExample';

import config from './aws-exports';
import { Blog } from './Blog';
Amplify.configure(config);

export const App = () => {
  // useQuery example
  const result = useQuery<listBlogsQuery, listBlogsQueryVariables>(listBlogs);
  const firstBlog = oc(result).data.listBlogs.items([])[0];
  const [showNewPost, setShowNewPost] = React.useState(false);

  // subscribe to event whenever post is created (global level)
  const [item] = useSubscription<postFragment>({
    config: {
      key: 'onCreatePost',
      query: onCreatePost,
    },
  });

  const [firstBlogNewPost] = useSubscription<
    postFragment,
    CreatePostMutationVariables
  >({
    config: firstBlog
      ? {
          key: 'onCreatePostForBlog',
          query: onCreatePostForBlog,
          variables: {
            input: {
              postBlogId: firstBlog.id,
              title: 'blah',
            },
          },
        }
      : undefined,
  });

  React.useEffect(() => {
    if (firstBlogNewPost) {
      setShowNewPost(true);
      refreshBlogs();
    }
    console.log('firstBlogNewPost', firstBlogNewPost);
  }, [JSON.stringify(firstBlogNewPost)]);

  React.useEffect(() => {
    if (item) {
      setShowNewPost(true);
      refreshBlogs();
    }
  }, [JSON.stringify(item)]);

  const refreshBlogs = () => {
    result.refetch();
  };

  React.useEffect(() => {
    if (showNewPost) {
      setTimeout(() => {
        setShowNewPost(false);
        refreshBlogs();
      }, 3000);
    }
  }, [showNewPost]);

  return (
    <div>
      {showNewPost && <div>Someone has created a new post!</div>}
      <button
        onClick={async () => {
          await mutation<CreateBlogMutation, CreateBlogMutationVariables>(
            createBlog,
            {
              input: {
                name: faker.lorem.words(3),
              },
            }
          );
          refreshBlogs();
        }}
      >
        Create Random Blog
      </button>
      <QueryHandler {...result} overlay={<Spinner />}>
        {data => (
          <div>
            {oc(data)
              .data.listBlogs.items([])
              .filter(notEmpty)
              .map(blog => (
                <Blog blog={blog} key={blog.id} refreshBlog={refreshBlogs} />
              ))}
          </div>
        )}
      </QueryHandler>
    </div>
  );
};
