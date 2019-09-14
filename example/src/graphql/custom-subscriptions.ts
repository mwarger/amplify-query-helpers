import { commentFragment } from './fragments';

export * from './subscriptions';

export const onUpdateComment = `subscription onUpdateComment($id: ID, $commentPostId: ID) {
  onUpdateComment(id: $id, commentPostId: $commentPostId) {
    ...comment
  }
}
${commentFragment}
`;
