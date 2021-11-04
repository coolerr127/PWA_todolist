import React, { useReducer } from 'react'

import { AlertContext } from './alertContext'
import alertReducer from './alertReducer'
import { SHOW_ALERT, HIDE_ALERT } from '../types'

function AlertState({ children }) {
	const [state, dispatch] = useReducer(alertReducer, { visible: false })

	function showAlert(message, type = 'warning') {
		dispatch({ type: SHOW_ALERT, payload: { message, type } })
		setTimeout(() => {
			dispatch({ type: HIDE_ALERT })
		}, 1500)
	}
	function hideAlert() {
		dispatch({ type: HIDE_ALERT })
	}

	return (
		<AlertContext.Provider value={{ showAlert, hideAlert, alert: state }}>
			{children}
		</AlertContext.Provider>
	)
}
export default AlertState
