import 'react-app-polyfill/ie11';
import * as React from 'react';
import {
  QueryHandler,
  useQuery,
  mutation,
  notEmpty,
  useQueryList,
  useSubscription,
  useCrudSubscription,
} from '../../.';
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  listBlogsQuery,
  listBlogsQueryVariables,
  CreateBlogMutation,
  CreateBlogMutationVariables,
  blogFragment,
  postFragment,
  postsForBlogQuery,
  postsForBlogQueryVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  commentFragment,
  commentsForPostQuery,
  commentsForPostQueryVariables,
  OnCreateCommentSubscriptionVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
  DeletePostMutation,
  DeletePostMutationVariables,
} from 'src/API';
import {
  createComment,
  createBlog,
  createPost,
  deleteComment,
  deletePost,
} from './graphql/mutations';
import Amplify from 'aws-amplify';

import * as faker from 'faker';
import { oc } from 'ts-optchain';
import {
  listBlogs,
  postsForBlog,
  commentsForPost,
} from './graphql/custom-queries';
import {
  onCreatePost,
  onCreateComment,
  onUpdateComment,
  onDeleteComment,
} from './graphql/subscriptions';
import { Spinner } from './SpinnerExample';

import config from './aws-exports';
Amplify.configure(config);

export const App = () => {
  // useQuery example
  const result = useQuery<listBlogsQuery, listBlogsQueryVariables>(listBlogs);

  const [showNewPost, setShowNewPost] = React.useState(false);

  // subscribe to event whenever post is created (global level)
  useSubscription<postFragment>({
    config: {
      key: 'onCreatePost',
      query: onCreatePost,
    },
    dispatch: () => {
      setShowNewPost(true);
    },
  });

  const refreshBlog = () => {
    result.refetch();
  };

  React.useEffect(() => {
    if (showNewPost) {
      setTimeout(() => {
        setShowNewPost(false);
      }, 3000);
    }
  }, [showNewPost]);

  return (
    <div>
      {showNewPost && <div>Someone has created a new post!</div>}
      <button
        onClick={async () => {
          await mutation<CreateBlogMutation, CreateBlogMutationVariables>(
            createBlog,
            {
              input: {
                name: faker.lorem.words(3),
              },
            }
          );
          refreshBlog();
        }}
      >
        Create Random Blog
      </button>
      <QueryHandler {...result} overlay={<Spinner />}>
        {data => (
          <div>
            {oc(data)
              .listBlogs.items([])
              .filter(notEmpty)
              .map(blog => (
                <Blog blog={blog} key={blog.id} refreshBlog={refreshBlog} />
              ))}
          </div>
        )}
      </QueryHandler>
    </div>
  );
};

const Blog: React.FC<{ blog: blogFragment; refreshBlog: () => void }> = ({
  blog,
  refreshBlog,
}) => {
  // useQueryList example
  const { nextToken, setToken, ...results } = useQueryList<
    postFragment,
    postsForBlogQuery,
    postsForBlogQueryVariables
  >('postsForBlog', postsForBlog, {
    postBlogId: blog.id,
  });

  const createRandomPost = async () => {
    await mutation<CreatePostMutation, CreatePostMutationVariables>(
      createPost,
      {
        input: {
          postBlogId: blog.id,
          title: faker.lorem.sentence(),
        },
      }
    );
    refreshBlog();
  };

  return (
    <>
      <h1>{blog.name}</h1>

      <QueryHandler {...results}>
        {posts => {
          return (
            <div>
              <button onClick={createRandomPost}>Create Random Post</button>
              {posts.map(post => {
                return (
                  <div key={post.id}>
                    <Post post={post} />
                  </div>
                );
              })}
              {nextToken && (
                <>
                  <button onClick={() => setToken(nextToken)}>Load More</button>
                </>
              )}
            </div>
          );
        }}
      </QueryHandler>
    </>
  );
};

const Post: React.FC<{ post: postFragment }> = ({ post }) => {
  const [deleted, setDeleted] = React.useState(false);
  const deleteThisPost = async (id: string) => {
    await mutation<DeletePostMutation, DeletePostMutationVariables>(
      deletePost,
      {
        input: {
          id,
        },
      }
    );
    setDeleted(true);
  };
  return deleted ? null : (
    <>
      <h3>{post.title}</h3>
      <span>
        <button onClick={() => deleteThisPost(post.id)}>
          Delete This Post
        </button>
      </span>
      <button
        onClick={async () => {
          await mutation<CreateCommentMutation, CreateCommentMutationVariables>(
            createComment,
            {
              input: {
                commentPostId: post.id,
                content: faker.lorem.paragraph(),
              },
            }
          );
        }}
      >
        Create Random Comment
      </button>
      <CommentList postId={post.id} />
    </>
  );
};

const CommentList: React.FC<{ postId }> = ({ postId }) => {
  const result = useQueryList<
    commentFragment,
    commentsForPostQuery,
    commentsForPostQueryVariables
  >('commentsForPost', commentsForPost, {
    commentPostId: postId,
  });

  return (
    <QueryHandler {...result}>
      {commentList => (
        <CommentSubscription commentList={commentList} postId={postId} />
      )}
    </QueryHandler>
  );
};

const CommentSubscription: React.FC<{
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
