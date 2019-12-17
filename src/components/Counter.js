import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../modules/counter'

const Counter = () => {
	const counter = useSelector(state => state.counter.counter)

	const dispatch = useDispatch()
	const onIncrease = useCallback(() => dispatch(increment()), [dispatch])
	const onDecrease = useCallback(() => dispatch(decrement()), [dispatch])

	return (
		<div>
			<h1>{counter}</h1>
			<div>
				<button onClick={onIncrease}>+1</button>
				<button onClick={onDecrease}>-1</button>
			</div>
		</div>
	)
}

export default Counter
