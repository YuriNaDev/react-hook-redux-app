import { combineReducers } from 'redux'
import counter from './counter'
import blog from './blog'

const rootReducer = combineReducers({
	counter,
	blog,
})

export default rootReducer
