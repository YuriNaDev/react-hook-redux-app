import { createAction, handleActions } from 'redux-actions'

const INCREMENT = 'counter/INCREMENT'
const DECREMENT = 'counter/DECREMENT'

const initialState = { counter: 10 }

export const increment = createAction(INCREMENT)
export const decrement = createAction(DECREMENT)

export default handleActions(
	{
		[INCREMENT]: state => ({ ...state, counter: state.counter + 1 }),
		[DECREMENT]: state => ({ ...state, counter: state.counter - 1 }),
	},
	initialState
)
