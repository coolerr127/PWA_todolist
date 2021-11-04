import React, { useState, useContext } from 'react'

import { AlertContext } from '../context/alert/alertContext'
import { FirebaseContext } from '../context/firebase/firebaseContext'

function Form() {
	const [value, setValue] = useState('')
	const alert = useContext(AlertContext)
	const firebase = useContext(FirebaseContext)

	function submitHandler(event) {
		event.preventDefault()

		if (value.trim()) {
			firebase
				.addTodo(value.trim())
				.then(() => {
					alert.showAlert('success', 'success')
				})
				.catch(() => {
					alert.showAlert('Something went wrong', 'danger')
				})
			setValue('')
		} else {
			alert.showAlert('Write todo')
		}
	}

	return (
		<form onSubmit={submitHandler}>
			<div class='input-group input-group-lg'>
				<input
					type='text'
					class='form-control'
					placeholder='Add ToDo'
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
			</div>
		</form>
	)
}

export default Form
