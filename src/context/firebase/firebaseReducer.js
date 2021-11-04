import { SHOW_LOADER, ADD_TODO, FETCH_TODOS, REMOVE_TODO } from '../types'

function firebaseReducer(state, action) {
	switch (action.type) {
		case SHOW_LOADER:
			return {
				...state,
				loading: true,
			}
		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload],
			}
		case FETCH_TODOS:
			return {
				...state,
				todos: action.payload,
				loading: false
			}
		case REMOVE_TODO:
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== action.payload),
			}

		default:
			return state
	}
}

export default firebaseReducer
