// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateComment = `subscription OnCreateComment($commentPostId: ID) {
  onCreateComment(commentPostId: $commentPostId) {
    id
    content
    post {
      id
      title
      postBlogId
    }
    commentPostId
  }
}
`;
export const onUpdateComment = `subscription OnUpdateComment($id: ID, $commentPostId: ID) {
  onUpdateComment(id: $id, commentPostId: $commentPostId) {
    id
    content
    post {
      id
      title
      postBlogId
    }
    commentPostId
  }
}
`;
export const onDeleteComment = `subscription OnDeleteComment($commentPostId: ID) {
  onDeleteComment(commentPostId: $commentPostId) {
    id
    content
    post {
      id
      title
      postBlogId
    }
    commentPostId
  }
}
`;
export const onCreatePostForBlog = `subscription OnCreatePostForBlog($postBlogId: ID) {
  onCreatePostForBlog(postBlogId: $postBlogId) {
    id
    title
    blog {
      id
      name
      publishDate
    }
    postBlogId
    comments {
      nextToken
    }
  }
}
`;
export const onCreateBlog = `subscription OnCreateBlog {
  onCreateBlog {
    id
    name
    publishDate
    posts {
      nextToken
    }
  }
}
`;
export const onUpdateBlog = `subscription OnUpdateBlog {
  onUpdateBlog {
    id
    name
    publishDate
    posts {
      nextToken
    }
  }
}
`;
export const onDeleteBlog = `subscription OnDeleteBlog {
  onDeleteBlog {
    id
    name
    publishDate
    posts {
      nextToken
    }
  }
}
`;
export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
    id
    title
    blog {
      id
      name
      publishDate
    }
    postBlogId
    comments {
      nextToken
    }
  }
}
`;
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
    id
    title
    blog {
      id
      name
      publishDate
    }
    postBlogId
    comments {
      nextToken
    }
  }
}
`;
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
    id
    title
    blog {
      id
      name
      publishDate
    }
    postBlogId
    comments {
      nextToken
    }
  }
}
`;
