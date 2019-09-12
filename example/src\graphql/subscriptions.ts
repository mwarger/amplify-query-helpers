// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateComment = `subscription OnCreateComment($commentPostId: ID) {
  onCreateComment(commentPostId: $commentPostId) {
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
export const onUpdateComment = `subscription OnUpdateComment($commentPostId: ID) {
  onUpdateComment(commentPostId: $commentPostId) {
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
export const onDeleteComment = `subscription OnDeleteComment($commentPostId: ID) {
  onDeleteComment(commentPostId: $commentPostId) {
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
export const onCreateBlog = `subscription OnCreateBlog {
  onCreateBlog {
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
export const onUpdateBlog = `subscription OnUpdateBlog {
  onUpdateBlog {
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
export const onDeleteBlog = `subscription OnDeleteBlog {
  onDeleteBlog {
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
export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
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
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
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
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
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
