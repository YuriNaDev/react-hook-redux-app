import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changePage, asyncFetchPosts, asyncFetchPost } from '../modules/blog'

const Posts = () => {
	const posts = useSelector(state => state.blog.posts, [])

	const dispatch = useDispatch()

	const handleClick = useCallback(
		id => {
			dispatch(asyncFetchPost(id))
		},
		[dispatch]
	)

	return (
		<ul>
			{posts.map(post => (
				<li
					key={post.id}
					style={{ cursor: 'pointer' }}
					onClick={() => handleClick(post.id)}
				>
					{post.title}
				</li>
			))}
		</ul>
	)
}

const Post = () => {
	const post = useSelector(state => state.blog.post, [])

	if (!post) return null

	return (
		<>
			<hr />
			<div>
				<h2>{post.title}</h2>
				<div>{post.body}</div>
			</div>
			<h5>Comments</h5>
			<ul>
				{post.comments.map(c => (
					<li key={c.id}>{c.body}</li>
				))}
			</ul>
		</>
	)
}

const Blog = () => {
	const page = useSelector(state => state.blog.page, [])
	const dispatch = useDispatch()

	const goPrev = useCallback(() => {
		dispatch(changePage(-1))
	}, [dispatch])

	const goNext = useCallback(() => {
		dispatch(changePage(1))
	}, [dispatch])

	useEffect(() => {
		dispatch(asyncFetchPosts())
	}, [dispatch, page])

	return (
		<div>
			<h1>Blog</h1>
			<div>
				<button onClick={goPrev} disabled={page === 0}>
					prev
				</button>
				<button onClick={goNext}>next</button>
			</div>
			<Posts />
			<Post />
		</div>
	)
}

export default Blog
