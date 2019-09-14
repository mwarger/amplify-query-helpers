import * as React from 'react';
import { QueryHandler, mutation, useQueryList } from '../../.';
import {
  blogFragment,
  postFragment,
  postsForBlogQuery,
  postsForBlogQueryVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  DeleteBlogMutation,
  DeleteBlogMutationVariables,
} from 'src/API';
import { createPost, deleteBlog } from './graphql/mutations';
import { postsForBlog } from './graphql/custom-queries';
import { Post } from './Post';
import * as faker from 'faker';

export const Blog: React.FC<{
  blog: blogFragment;
  refreshBlog: () => void;
}> = ({ blog, refreshBlog }) => {
  // useQueryList example
  const { nextToken, setToken, ...results } = useQueryList<
    postFragment,
    postsForBlogQuery,
    postsForBlogQueryVariables
  >('postsForBlog', postsForBlog, {
    postBlogId: blog.id,
  });
  const createRandomPost = async () => {
    await mutation<CreatePostMutation, CreatePostMutationVariables>(
      createPost,
      {
        input: {
          postBlogId: blog.id,
          title: faker.lorem.sentence(),
        },
      }
    );
    refreshBlog();
  };

  const removeBlog = async () => {
    await mutation<DeleteBlogMutation, DeleteBlogMutationVariables>(
      deleteBlog,
      {
        input: {
          id: blog.id,
        },
      }
    );
    refreshBlog();
  };

  return (
    <>
      <h1>{blog.name}</h1>
      <h3>{blog.publishDate}</h3>
      <button onClick={removeBlog}>Delete Blog</button>

      <QueryHandler {...results}>
        {({ data: posts }) => (
          <div>
            <button onClick={createRandomPost}>Create Random Post</button>
            {posts.map(post => (
              <div key={post.id}>
                <Post post={post} />
              </div>
            ))}
            {nextToken && (
              <>
                <button onClick={() => setToken(nextToken)}>Load More</button>
              </>
            )}
          </div>
        )}
      </QueryHandler>
    </>
  );
};
