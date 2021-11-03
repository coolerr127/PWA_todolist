import React from 'react'

function Alert({ alert }) {
	if (!alert) {
		return null
	}
	return (
		<div
			class={`alert alert-${alert.type || 'warning'} alert-dismissible`}
			role='alert'
		>
			<strong>Alert! </strong>
			{alert.message}
			<button
				type='button'
				class='btn-close'
				aria-label='Close'
			></button>
		</div>
	)
}

export default Alert
