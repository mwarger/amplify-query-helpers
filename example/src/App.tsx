import 'react-app-polyfill/ie11';
import * as React from 'react';
import {
  QueryHandler,
  useQuery,
  mutation,
  notEmpty,
  useSubscription,
} from '../../.';
import {
  listBlogsQuery,
  listBlogsQueryVariables,
  CreateBlogMutation,
  CreateBlogMutationVariables,
  postFragment,
} from 'src/API';
import { createBlog } from './graphql/mutations';
import Amplify from 'aws-amplify';

import * as faker from 'faker';
import { oc } from 'ts-optchain';
import { listBlogs } from './graphql/custom-queries';
import { onCreatePost } from './graphql/subscriptions';
import { Spinner } from './SpinnerExample';

import config from './aws-exports';
import { Blog } from './Blog';
Amplify.configure(config);

export const App = () => {
  // useQuery example
  const result = useQuery<listBlogsQuery, listBlogsQueryVariables>(listBlogs);

  const [showNewPost, setShowNewPost] = React.useState(false);

  // subscribe to event whenever post is created (global level)
  useSubscription<postFragment>({
    config: {
      key: 'onCreatePost',
      query: onCreatePost,
    },
    dispatch: () => {
      setShowNewPost(true);
    },
  });

  const refreshBlog = () => {
    result.refetch();
  };

  React.useEffect(() => {
    if (showNewPost) {
      setTimeout(() => {
        setShowNewPost(false);
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
          refreshBlog();
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
                <Blog blog={blog} key={blog.id} refreshBlog={refreshBlog} />
              ))}
          </div>
        )}
      </QueryHandler>
    </div>
  );
};
