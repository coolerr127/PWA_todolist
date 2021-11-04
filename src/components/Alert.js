import React, { useContext } from 'react'

import { AlertContext } from '../context/alert/alertContext'

function Alert() {
	const { alert, hideAlert } = useContext(AlertContext)

	if (!alert.visible) {
		return null
	}

	return (
		<div
			class={`alert alert-${alert.type || 'warning'} alert-dismissible`}
			role='alert'
		>
			<strong>Alert!</strong>
			&nbsp;{alert.message}
			<button
				onClick={hideAlert}
				type='button'
				class='btn-close'
				aria-label='Close'
			></button>
		</div>
	)
}

export default Alert
