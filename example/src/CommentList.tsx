import * as React from 'react';
import { QueryHandler, useQueryList } from '../../src';
import {
  commentFragment,
  commentsForPostQuery,
  commentsForPostQueryVariables,
} from 'src/API';
import { commentsForPost } from './graphql/custom-queries';
import { CommentSubscription } from './CommentSubscription';
export const CommentList: React.FC<{
  postId;
}> = ({ postId }) => {
  const result = useQueryList<
    commentFragment,
    commentsForPostQuery,
    commentsForPostQueryVariables
  >('commentsForPost', commentsForPost, {
    commentPostId: postId,
  });
  return (
    <QueryHandler {...result} key={JSON.stringify(result.data)}>
      {({ data: commentList }) => (
        <CommentSubscription commentList={commentList} postId={postId} />
      )}
    </QueryHandler>
  );
};
