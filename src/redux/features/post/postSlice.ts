import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comment, CreatePost, Post, ReplyComment, createComment } from "./post";
import { getDb } from "../auth/authSlice";
import { DB } from "../auth/auth";
import { v4 as uuidV4 } from "uuid";

interface InitialStateI {
    posts: Post[];
    postSuccess: boolean;
    commentSuccess: boolean;
}

export const initialState: InitialStateI = {
    posts: [],
    postSuccess: false,
    commentSuccess: false
};


// get all post from db
const getAllPostsFromDb = () => {
    let posts: Post[] = [];
    const db: DB = JSON.parse(getDb());
    db?.users?.forEach(user => {
        posts.push(...user?.posts);
    })
    return posts;
};


// create post in db
const createPostInDb = (post: CreatePost) => {
    const db: DB = JSON.parse(getDb());
    let isPostCreated = false;
    const users = db?.users?.map(user => {
        if (user._id === post.author?._id) {
            user.posts.push({
                _id: uuidV4(),
                description: post.description,
                title: post.title,
                author: post.author,
                comments: [],
            })
            isPostCreated = true;
        }
        return user;
    })

    if (users && isPostCreated) {
        localStorage.setItem("db", JSON.stringify({
            users
        }))

    }
    return { isPostCreated, users }
}

// create top level comment
const createPostCommentInDb = (payload: createComment) => {
    const db: DB = JSON.parse(getDb());
    let isCommentCreated = false;

    const users = db?.users?.map(user => {
        if (user._id === payload.postAuthor?._id) {

            user?.posts?.map(post => {
                if (post?._id == payload?.postId) {
                    post?.comments?.push({
                        _id: uuidV4(),
                        author: payload?.commentor,
                        replies: [],
                        text: payload?.text
                    })
                    isCommentCreated = true;
                }
                return post;
            })
        }
        return user;
    })

    if (users && isCommentCreated) {
        localStorage.setItem("db", JSON.stringify({
            users
        }))
    }
    return { isCommentCreated, users }
}


// add reply to specific comment recursively
function addReply(commentId: string, reply: Comment, comments: Comment[]) {
    for (let comment of comments) {
        if (comment._id === commentId) {
            comment.replies.push(reply);
            return true;
        } else if (comment.replies.length > 0) {
            if (addReply(commentId, reply, comment.replies)) {
                return true;
            }
        }
    }
    return false;
}

const replyCommentInDb = (payload: ReplyComment) => {
    const db: DB = JSON.parse(getDb());
    let isCommentCreated = false;

    const reply: Comment = {
        _id: uuidV4(),
        author: payload?.commentor,
        replies: [],
        text: payload?.text
    }

    const users = db?.users?.map(user => {
        if (user._id === payload.postAuthor?._id) {

            user?.posts?.map(post => {
                if (post?._id == payload?.postId) {

                    isCommentCreated = addReply(payload.commentId,reply,post?.comments);
                    // post?.comments?.map(comment => {
                    //     if (comment._id === payload?.commentId) {
                    //         comment?.replies?.push({
                    //             _id: uuidV4(),
                    //             author: payload?.commentor,
                    //             replies: [],
                    //             text: payload?.text
                    //         })
                    //         isCommentCreated = true;
                    //     }
                    // })
                }
                return post;
            })
        }
        return user;
    })

    console.log("user reply nested", users);

    if (users && isCommentCreated) {
        localStorage.setItem("db", JSON.stringify({
            users
        }))
    }
    return { isCommentCreated, users }
}

export const postSlice = createSlice({
    name: "Post",
    initialState,
    reducers: {
        createPost: (state, { payload }: PayloadAction<CreatePost>) => {
            const { isPostCreated } = createPostInDb(payload);
            state.postSuccess = isPostCreated ? true : false;
            state.posts = getAllPostsFromDb();
        },

        addPostComment: (state, { payload }: PayloadAction<createComment>) => {
            const { isCommentCreated } = createPostCommentInDb(payload);
            state.commentSuccess = isCommentCreated ? true : false;
            state.posts = getAllPostsFromDb();
        },

        replyComment: (state, { payload }: PayloadAction<ReplyComment>) => {
            const { isCommentCreated } = replyCommentInDb(payload);
            state.commentSuccess = isCommentCreated ? true : false;
            state.posts = getAllPostsFromDb();
        },

        defaultPostSuccess: (state) => {
            state.postSuccess = false;
        },

        defaultCommentSuccess: (state) => {
            state.postSuccess = false;
        },

        getAllPosts: (state) => {
            state.posts = getAllPostsFromDb();
        },
    },
});

export const { createPost, addPostComment, replyComment, getAllPosts, defaultPostSuccess } = postSlice.actions;
