import { commentFragment } from './fragments';

export const updateComment = `mutation updateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    ...comment
  }
}
${commentFragment}
`;
