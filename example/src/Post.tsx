import * as React from 'react';
import { mutation } from '../../src';
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  postFragment,
  DeletePostMutation,
  DeletePostMutationVariables,
} from 'src/API';
import { createComment, deletePost } from './graphql/mutations';
import { CommentList } from './CommentList';
import * as faker from 'faker';

export const Post: React.FC<{
  post: postFragment;
}> = ({ post }) => {
  const [deleted, setDeleted] = React.useState(false);
  const deleteThisPost = async (id: string) => {
    await mutation<DeletePostMutation, DeletePostMutationVariables>(
      deletePost,
      {
        input: {
          id,
        },
      }
    );
    setDeleted(true);
  };
  return deleted ? null : (
    <>
      <h3>{post.title}</h3>
      <span>
        <button onClick={() => deleteThisPost(post.id)}>
          Delete This Post
        </button>
      </span>
      <button
        onClick={async () => {
          await mutation<CreateCommentMutation, CreateCommentMutationVariables>(
            createComment,
            {
              input: {
                commentPostId: post.id,
                content: faker.lorem.paragraph(),
              },
            }
          );
        }}
      >
        Create Random Comment
      </button>
      <CommentList postId={post.id} />
    </>
  );
};
