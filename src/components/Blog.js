import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncFetchPosts, asyncFetchPost } from '../modules/blog'

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
	const [start, setStart] = useState(0)

	const dispatch = useDispatch()

	const goPrev = useCallback(() => {
		setStart(start => start - 1)
	}, [])

	const goNext = useCallback(() => {
		setStart(start => start + 1)
	}, [])

	useEffect(() => {
		dispatch(asyncFetchPosts(start))
	}, [dispatch, start])

	return (
		<div>
			<h1>Blog</h1>
			<div>
				<button onClick={goPrev} disabled={start === 0}>
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
