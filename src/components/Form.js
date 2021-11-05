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
			<div className='input-group input-group-lg'>
				<input
					autoFocus='true'
					type='text'
					className='form-control'
					placeholder='Add ToDo'
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
				<input
							type='submit'
							className='btn btn-outline-primary btn-sm'
							value='submit'
						/>
			</div>
		</form>
	)
}

export default Form
