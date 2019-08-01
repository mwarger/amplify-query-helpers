import { blogFragment, postFragment, commentFragment } from './fragments';

export const listBlogs = `query listBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        ...blog
      }
      nextToken
    }
  }
  ${blogFragment}
  `;

export const postsForBlog = `query postsForBlog(
    $postBlogId: ID
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsForBlog(
      postBlogId: $postBlogId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ...post
      }
      nextToken
    }
  }
  ${postFragment}
  `;

export const commentsForPost = `query commentsForPost(
    $commentPostId: ID
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsForPost(
      commentPostId: $commentPostId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ...comment
      }
      nextToken
    }
  }
  ${commentFragment}
  `;
