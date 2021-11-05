import React, { useContext, useEffect, useState } from 'react'

import { FirebaseContext } from '../context/firebase/firebaseContext'
import { AlertContext } from '../context/alert/alertContext'
import Loader from './Loader'

function ToDos() {
	const { loading, todos, fetchTodos, removeTodo, compliteTodo, changeTodo, setTodoList } =
		useContext(FirebaseContext)
	const alert = useContext(AlertContext)

	const [value, setValue] = useState('')
	const [edit, setEdit] = useState('')

	const [currentTodo, setCurrentTodo] = useState(null)
	// const [todoList, setTodoList] = useState(todos)

	useEffect(() => {
		fetchTodos()
		// eslint-disable-next-line
	}, [])

	function submitChanges(event) {
		event.preventDefault()
		if (value.trim()) {
			changeTodo(edit, value.trim())
				.then(() => {
					alert.showAlert('success', 'success')
				})
				.catch(e => {
					alert.showAlert('Something went wrong', 'danger')
				})
			setValue('')
		} else {
			alert.showAlert('Write todo')
		}

		setEdit('')
	}

	function isEdit(todo) {
		if (todo.id === edit) {
			return (
				<form className='edit-todo' onSubmit={submitChanges}>
					<div className='input-group input-group-sm'>
						<input
							autoFocus='true'
							onBlur={() => setEdit('')}
							type='text'
							className='form-control'
							placeholder='Add ToDo'
							value={value}
							onChange={e => setValue(e.target.value)}
						/>
						<input
							type='submit'
							className='btn btn-outline-success btn-sm'
							value='Ok'
						/>
					</div>
				</form>
			)
		} else {
			return todo.title
		}
	}

	function dragStartHandler(todo) {
		setCurrentTodo(todo)
	}
	function dragOverHandler(e) {
		e.preventDefault()
	}
	function dropHandler(e, todo, currentTodo) {
		setTodoList(e, todo, currentTodo)
	}
	function sortTodos(a, b) {
		if (a.order > b.order) {
			return 1
		} else {
			return -1
		}
	}

	if (loading) {
		return <Loader />
	}
	return (
		<ul className='list-group pt-3'>
			{todos.sort(sortTodos).map(todo => (
				<li
					draggable={true}
					onDragStart={e => dragStartHandler(todo)}
					onDragOver={e => dragOverHandler(e)}
					onDrop={e => dropHandler(e, todo, currentTodo)}
					className={`list-group-item todo complite-${todo.complite}`}
					key={todo.id}
				>
					{isEdit(todo)}
					<div className='buttons'>
						<button
							onClick={() => compliteTodo(todo.id)}
							type='button'
							className='btn btn-outline-success btn-sm'
						>
							&#10004;
						</button>
						<button
							onClick={() => {
								setEdit(todo.id)
								setValue(todo.title)
							}}
							type='button'
							className='btn btn-outline-warning btn-sm'
						>
							&#9997;
						</button>
						<button
							onClick={() => removeTodo(todo.id)}
							type='button'
							className='btn btn-outline-danger btn-sm'
						>
							&#10008;
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}

export default ToDos
