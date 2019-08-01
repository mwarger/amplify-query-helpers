// tslint:disable
// this is an auto generated file. This will be overwritten

export const getBlog = `query GetBlog($id: ID!) {
  getBlog(id: $id) {
    id
    name
    posts {
      items {
        id
        title
        postBlogId
      }
      nextToken
    }
  }
}
`;
export const listBlogs = `query ListBlogs(
  $filter: ModelBlogFilterInput
  $limit: Int
  $nextToken: String
) {
  listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      posts {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    postBlogId
    comments {
      items {
        id
        content
        commentPostId
      }
      nextToken
    }
  }
}
`;
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      blog {
        id
        name
      }
      postBlogId
      comments {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      postBlogId
      comments {
        nextToken
      }
    }
    commentPostId
  }
}
`;
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      post {
        id
        title
        postBlogId
      }
      commentPostId
    }
    nextToken
  }
}
`;
export const postsForBlog = `query PostsForBlog(
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
      id
      title
      blog {
        id
        name
      }
      postBlogId
      comments {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const commentsForPost = `query CommentsForPost(
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
      id
      content
      post {
        id
        title
        postBlogId
      }
      commentPostId
    }
    nextToken
  }
}
`;
