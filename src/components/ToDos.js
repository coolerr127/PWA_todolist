import React, { useContext, useEffect } from 'react'

import { FirebaseContext } from '../context/firebase/firebaseContext'
import Loader from './Loader'

function ToDos() {
	const { loading, todos, fetchTodos, removeTodo } =
		useContext(FirebaseContext)

	useEffect(() => {
		fetchTodos()
		// eslint-disable-next-line
	}, [])

	if (loading) {
		return <Loader />
	}

	return (
		<ul class='list-group pt-3'>
			{todos.map(todo => (
				<li class='list-group-item todo' key={todo.id}>
					{todo.title}

					<div className='buttons'>
						<button
							onClick={() => removeTodo(todo.id)}
							type='button'
							class='btn btn-outline-success btn-sm'
						>
							&#10004;
						</button>
						<button
							onClick={() => removeTodo(todo.id)}
							type='button'
							class='btn btn-outline-warning btn-sm'
						>
							&#9997;
						</button>
						<button
							onClick={() => removeTodo(todo.id)}
							type='button'
							class='btn btn-outline-danger btn-sm'
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
