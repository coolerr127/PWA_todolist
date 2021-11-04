import {SHOW_ALERT, HIDE_ALERT} from '../types'

function alertReducer(state, action) {
	switch (action.type) {
		case SHOW_ALERT:
			return {
				...action.payload,
				visible: true,
			}
		case HIDE_ALERT:
			return {
				...state,
				visible: false,
			}

		default:
			return state
	}
}

export default alertReducer
