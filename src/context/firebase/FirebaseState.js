import React, { useReducer, useContext } from 'react'
import axios from 'axios'

import { FirebaseContext } from './firebaseContext'
import { AlertContext } from '../alert/alertContext'
import firebaseReducer from './firebaseReducer'
import { ADD_TODO, FETCH_TODOS, REMOVE_TODO, SHOW_LOADER } from '../types'

const url = process.env.REACT_APP_DB_URL

function FirebaseState({ children }) {
	const initialState = {
		todos: [],
		loading: false,
	}
	const [state, dispatch] = useReducer(firebaseReducer, initialState)

	const alert = useContext(AlertContext)

	function showLoader() {
		dispatch({ type: SHOW_LOADER })
	}

	async function fetchTodos() {
		showLoader()
		const res = await axios.get(`${url}/todos.json`)

		let payload = []

		if (res.data) {
			payload = Object.keys(res.data).map(key => {
				return {
					...res.data[key],
					id: key,
				}
			})
		}
		dispatch({ type: FETCH_TODOS, payload })
	}

	async function addTodo(title) {
		const todo = {
			title,
			compile: false,
		}

		try {
			const res = await axios.post(`${url}/todos.json`, todo)
			const payload = {
				...todo,
				id: res.data.name,
			}

			dispatch({ type: ADD_TODO, payload })
		} catch (e) {
			throw new Error(e.message)
		}
	}

	// async function compliteTodo(id) {
	// 	const todo = {
	// 		title,
	// 		compile: false,
	// 	}

	// 	try {
	// 		const res = await axios.post(`${url}/todos.json`, todo)
	// 		const payload = {
	// 			...todo,
	// 			id: res.data.name,
	// 		}

	// 		dispatch({ type: ADD_TODO, payload })
	// 	} catch (e) {
	// 		throw new Error(e.message)
	// 	}
	// }

	async function removeTodo(id) {
		await axios
			.delete(`${url}/todos/${id}.json`)
			.then(() => {
				alert.showAlert('success', 'success')
			})
			.catch(() => {
				alert.showAlert('Something went wrong', 'danger')
			})

		dispatch({
			type: REMOVE_TODO,
			payload: id,
		})
	}

	return (
		<FirebaseContext.Provider
			value={{
				showLoader,
				fetchTodos,
				addTodo,
				removeTodo,
				todos: state.todos,
				loading: state.loading,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	)
}

export default FirebaseState
