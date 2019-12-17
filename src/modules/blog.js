import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
})

const CHANGE_PAGE = 'post/CHANGE_PAGE'
const FETCH_POSTS = 'post/FETCH_POSTS'
const FETCH_POST = 'post/FETCH_POST'

const initialState = {
	page: 0,
	posts: [],
	post: null,
}

export const changePage = createAction(CHANGE_PAGE, mount => mount)
const fetchPosts = createAction(FETCH_POSTS, posts => posts)
const fetchPost = createAction(FETCH_POST, post => post)

export const asyncFetchPosts = () => (dispatch, getState) =>
	instance
		.get(`/posts?_start=${getState().blog.page}&_limit=10`)
		.then(({ data }) => dispatch(fetchPosts(data)))

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
		[CHANGE_PAGE]: (state, { payload: mount }) => ({
			...state,
			page: state.page + mount,
		}),
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
