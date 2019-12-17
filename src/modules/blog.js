import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
})

const FETCH_POSTS = 'user/FETCH_POSTS'
const FETCH_POST = 'user/FETCH_POST'

const initialState = {
	posts: [],
	post: null,
}

const fetchPosts = createAction(FETCH_POSTS, posts => posts)
const fetchPost = createAction(FETCH_POST, post => post)

export const asyncFetchPosts = start => dispatch =>
	instance
		.get(`/posts?_start=${start}&_limit=10`)
		.then(({ data: posts }) => dispatch(fetchPosts(posts)))

export const asyncFetchPost = id => dispatch =>
	Promise.all([
		instance.get(`/posts/${id}`),
		instance.get(`/comments?postId=${id}`),
	]).then(res => {
		const post = res[0].data
		post.comments = res[1].data
		return dispatch(fetchPost(post))
	})

export default handleActions(
	{
		[FETCH_POSTS]: (state, { payload: posts }) => ({
			...state,
			posts,
			post: null,
		}),
		[FETCH_POST]: (state, { payload: post }) => ({
			...state,
			post,
		}),
	},
	initialState
)
