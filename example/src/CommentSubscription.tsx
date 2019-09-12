import * as React from 'react';
import { mutation, useCrudSubscription } from '../../.';
import {
  commentFragment,
  OnCreateCommentSubscriptionVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
} from 'src/API';
import { deleteComment } from './graphql/mutations';
import {
  onCreateComment,
  onUpdateComment,
  onDeleteComment,
} from './graphql/subscriptions';
export const CommentSubscription: React.FC<{
  commentList: commentFragment[];
  postId: string;
}> = ({ postId, commentList }) => {
  // useCrudSubscription example
  const [list] = useCrudSubscription<
    commentFragment,
    OnCreateCommentSubscriptionVariables // this is only for the shape, this will be the same for Create, Update, and Delete
  >({
    listData: commentList,
    configs: {
      createdConfig: {
        key: 'onCreateComment',
        query: onCreateComment,
        variables: {
          commentPostId: postId,
        },
      },
      updatedConfig: {
        key: 'onUpdateComment',
        query: onUpdateComment,
        variables: {
          commentPostId: postId,
        },
      },
      deletedConfig: {
        key: 'onDeleteComment',
        query: onDeleteComment,
        variables: {
          commentPostId: postId,
        },
      },
    },
  });
  return (
    <ul>
      {list.map(comment => (
        <li key={comment.id}>
          {comment.content}{' '}
          <span>
            <button
              onClick={async () => {
                mutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
                  deleteComment,
                  {
                    input: { id: comment.id },
                  }
                );
              }}
            >
              Delete Comment
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};
