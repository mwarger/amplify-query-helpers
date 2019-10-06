/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type UpdateCommentInput = {
  id: string;
  content?: string | null;
  commentPostId?: string | null;
};

export type ModelBlogFilterInput = {
  id?: ModelIDFilterInput | null;
  name?: ModelStringFilterInput | null;
  publishDate?: ModelStringFilterInput | null;
  and?: Array<ModelBlogFilterInput | null> | null;
  or?: Array<ModelBlogFilterInput | null> | null;
  not?: ModelBlogFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelPostFilterInput = {
  id?: ModelIDFilterInput | null;
  title?: ModelStringFilterInput | null;
  postBlogId?: ModelIDFilterInput | null;
  and?: Array<ModelPostFilterInput | null> | null;
  or?: Array<ModelPostFilterInput | null> | null;
  not?: ModelPostFilterInput | null;
};

export type ModelCommentFilterInput = {
  id?: ModelIDFilterInput | null;
  content?: ModelStringFilterInput | null;
  commentPostId?: ModelIDFilterInput | null;
  and?: Array<ModelCommentFilterInput | null> | null;
  or?: Array<ModelCommentFilterInput | null> | null;
  not?: ModelCommentFilterInput | null;
};

export type CreateBlogInput = {
  id?: string | null;
  name: string;
  publishDate?: string | null;
};

export type UpdateBlogInput = {
  id: string;
  name?: string | null;
  publishDate?: string | null;
};

export type DeleteBlogInput = {
  id?: string | null;
};

export type CreatePostInput = {
  id?: string | null;
  title: string;
  postBlogId: string;
};

export type UpdatePostInput = {
  id: string;
  title?: string | null;
  postBlogId?: string | null;
};

export type DeletePostInput = {
  id?: string | null;
};

export type CreateCommentInput = {
  id?: string | null;
  content?: string | null;
  commentPostId: string;
};

export type DeleteCommentInput = {
  id?: string | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type updateCommentMutationVariables = {
  input: UpdateCommentInput;
};

export type updateCommentMutation = {
  updateComment: {
    __typename: 'Comment';
    id: string;
    content: string | null;
    commentPostId: string;
  } | null;
};

export type listBlogsQueryVariables = {
  filter?: ModelBlogFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type listBlogsQuery = {
  listBlogs: {
    __typename: 'ModelBlogConnection';
    items: Array<{
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type postsForBlogQueryVariables = {
  postBlogId?: string | null;
  filter?: ModelPostFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type postsForBlogQuery = {
  postsForBlog: {
    __typename: 'ModelPostConnection';
    items: Array<{
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type commentsForPostQueryVariables = {
  commentPostId?: string | null;
  filter?: ModelCommentFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type commentsForPostQuery = {
  commentsForPost: {
    __typename: 'ModelCommentConnection';
    items: Array<{
      __typename: 'Comment';
      id: string;
      content: string | null;
      commentPostId: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type onUpdateCommentSubscriptionVariables = {
  id?: string | null;
  commentPostId?: string | null;
};

export type onUpdateCommentSubscription = {
  onUpdateComment: {
    __typename: 'Comment';
    id: string;
    content: string | null;
    commentPostId: string;
  } | null;
};

export type CreateBlogMutationVariables = {
  input: CreateBlogInput;
};

export type CreateBlogMutation = {
  createBlog: {
    __typename: 'Blog';
    id: string;
    name: string;
    publishDate: string | null;
    posts: {
      __typename: 'ModelPostConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type UpdateBlogMutationVariables = {
  input: UpdateBlogInput;
};

export type UpdateBlogMutation = {
  updateBlog: {
    __typename: 'Blog';
    id: string;
    name: string;
    publishDate: string | null;
    posts: {
      __typename: 'ModelPostConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type DeleteBlogMutationVariables = {
  input: DeleteBlogInput;
};

export type DeleteBlogMutation = {
  deleteBlog: {
    __typename: 'Blog';
    id: string;
    name: string;
    publishDate: string | null;
    posts: {
      __typename: 'ModelPostConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type CreatePostMutationVariables = {
  input: CreatePostInput;
};

export type CreatePostMutation = {
  createPost: {
    __typename: 'Post';
    id: string;
    title: string;
    blog: {
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null;
    postBlogId: string;
    comments: {
      __typename: 'ModelCommentConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput;
};

export type UpdatePostMutation = {
  updatePost: {
    __typename: 'Post';
    id: string;
    title: string;
    blog: {
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null;
    postBlogId: string;
    comments: {
      __typename: 'ModelCommentConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type DeletePostMutationVariables = {
  input: DeletePostInput;
};

export type DeletePostMutation = {
  deletePost: {
    __typename: 'Post';
    id: string;
    title: string;
    blog: {
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null;
    postBlogId: string;
    comments: {
      __typename: 'ModelCommentConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput;
};

export type CreateCommentMutation = {
  createComment: {
    __typename: 'Comment';
    id: string;
    content: string | null;
    post: {
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null;
    commentPostId: string;
  } | null;
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput;
};

export type UpdateCommentMutation = {
  updateComment: {
    __typename: 'Comment';
    id: string;
    content: string | null;
    post: {
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null;
    commentPostId: string;
  } | null;
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput;
};

export type DeleteCommentMutation = {
  deleteComment: {
    __typename: 'Comment';
    id: string;
    content: string | null;
    post: {
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null;
    commentPostId: string;
  } | null;
};

export type GetBlogQueryVariables = {
  id: string;
};

export type GetBlogQuery = {
  getBlog: {
    __typename: 'Blog';
    id: string;
    name: string;
    publishDate: string | null;
    posts: {
      __typename: 'ModelPostConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type ListBlogsQueryVariables = {
  filter?: ModelBlogFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListBlogsQuery = {
  listBlogs: {
    __typename: 'ModelBlogConnection';
    items: Array<{
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetPostQueryVariables = {
  id: string;
};

export type GetPostQuery = {
  getPost: {
    __typename: 'Post';
    id: string;
    title: string;
    blog: {
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null;
    postBlogId: string;
    comments: {
      __typename: 'ModelCommentConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPostsQuery = {
  listPosts: {
    __typename: 'ModelPostConnection';
    items: Array<{
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetCommentQueryVariables = {
  id: string;
};

export type GetCommentQuery = {
  getComment: {
    __typename: 'Comment';
    id: string;
    content: string | null;
    post: {
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null;
    commentPostId: string;
  } | null;
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListCommentsQuery = {
  listComments: {
    __typename: 'ModelCommentConnection';
    items: Array<{
      __typename: 'Comment';
      id: string;
      content: string | null;
      commentPostId: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type PostsForBlogQueryVariables = {
  postBlogId?: string | null;
  title?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelPostFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type PostsForBlogQuery = {
  postsForBlog: {
    __typename: 'ModelPostConnection';
    items: Array<{
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type CommentsForPostQueryVariables = {
  commentPostId?: string | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelCommentFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type CommentsForPostQuery = {
  commentsForPost: {
    __typename: 'ModelCommentConnection';
    items: Array<{
      __typename: 'Comment';
      id: string;
      content: string | null;
      commentPostId: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateCommentSubscriptionVariables = {
  commentPostId?: string | null;
};

export type OnCreateCommentSubscription = {
  onCreateComment: {
    __typename: 'Comment';
    id: string;
    content: string | null;
    post: {
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null;
    commentPostId: string;
  } | null;
};

export type OnUpdateCommentSubscriptionVariables = {
  id?: string | null;
  commentPostId?: string | null;
};

export type OnUpdateCommentSubscription = {
  onUpdateComment: {
    __typename: 'Comment';
    id: string;
    content: string | null;
    post: {
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null;
    commentPostId: string;
  } | null;
};

export type OnDeleteCommentSubscriptionVariables = {
  commentPostId?: string | null;
};

export type OnDeleteCommentSubscription = {
  onDeleteComment: {
    __typename: 'Comment';
    id: string;
    content: string | null;
    post: {
      __typename: 'Post';
      id: string;
      title: string;
      postBlogId: string;
    } | null;
    commentPostId: string;
  } | null;
};

export type OnCreatePostForBlogSubscriptionVariables = {
  postBlogId?: string | null;
};

export type OnCreatePostForBlogSubscription = {
  onCreatePostForBlog: {
    __typename: 'Post';
    id: string;
    title: string;
    blog: {
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null;
    postBlogId: string;
    comments: {
      __typename: 'ModelCommentConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnCreateBlogSubscription = {
  onCreateBlog: {
    __typename: 'Blog';
    id: string;
    name: string;
    publishDate: string | null;
    posts: {
      __typename: 'ModelPostConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnUpdateBlogSubscription = {
  onUpdateBlog: {
    __typename: 'Blog';
    id: string;
    name: string;
    publishDate: string | null;
    posts: {
      __typename: 'ModelPostConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnDeleteBlogSubscription = {
  onDeleteBlog: {
    __typename: 'Blog';
    id: string;
    name: string;
    publishDate: string | null;
    posts: {
      __typename: 'ModelPostConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnCreatePostSubscription = {
  onCreatePost: {
    __typename: 'Post';
    id: string;
    title: string;
    blog: {
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null;
    postBlogId: string;
    comments: {
      __typename: 'ModelCommentConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnUpdatePostSubscription = {
  onUpdatePost: {
    __typename: 'Post';
    id: string;
    title: string;
    blog: {
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null;
    postBlogId: string;
    comments: {
      __typename: 'ModelCommentConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnDeletePostSubscription = {
  onDeletePost: {
    __typename: 'Post';
    id: string;
    title: string;
    blog: {
      __typename: 'Blog';
      id: string;
      name: string;
      publishDate: string | null;
    } | null;
    postBlogId: string;
    comments: {
      __typename: 'ModelCommentConnection';
      nextToken: string | null;
    } | null;
  } | null;
};

export type blogFragment = {
  __typename: 'Blog';
  id: string;
  name: string;
  publishDate: string | null;
};

export type postFragment = {
  __typename: 'Post';
  id: string;
  title: string;
  postBlogId: string;
};

export type commentFragment = {
  __typename: 'Comment';
  id: string;
  content: string | null;
  commentPostId: string;
};
