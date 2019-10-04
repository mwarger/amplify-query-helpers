import * as React from 'react';
import { mutation, useCrudSubscription, useSubscription } from '../../.';
import {
  commentFragment,
  OnCreateCommentSubscriptionVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
  updateCommentMutation,
  updateCommentMutationVariables,
  onUpdateCommentSubscriptionVariables,
} from 'src/API';
import { deleteComment } from './graphql/mutations';
import { onCreateComment, onDeleteComment } from './graphql/subscriptions';
import * as faker from 'faker';
import { onUpdateComment } from './graphql/custom-subscriptions';
import { updateComment } from './graphql/custom-mutations';

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
        <CommentListItem key={comment.id} {...comment} />
      ))}
    </ul>
  );
};

export const CommentListItem: React.FC<commentFragment> = comment => {
  const [subbedComment] = useSubscription<
    commentFragment,
    onUpdateCommentSubscriptionVariables
  >({
    itemData: comment,
    config: {
      key: 'onUpdateComment',
      query: onUpdateComment,
      variables: {
        id: comment.id,
      },
    },
  });

  if (!subbedComment) {
    return null;
  }

  const { id, content } = subbedComment;
  return (
    <li>
      {content}{' '}
      <span>
        <button
          onClick={async () => {
            mutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
              deleteComment,
              {
                input: { id },
              }
            );
          }}
        >
          Delete Comment
        </button>
      </span>
      <span>
        <button
          onClick={async () => {
            mutation<updateCommentMutation, updateCommentMutationVariables>(
              updateComment,
              {
                input: { id, content: faker.lorem.sentence() },
              }
            );
          }}
        >
          Update Comment
        </button>
      </span>
    </li>
  );
};
