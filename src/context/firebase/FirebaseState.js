import React, { useReducer, useContext } from 'react'
import axios from 'axios'

import { FirebaseContext } from './firebaseContext'
import { AlertContext } from '../alert/alertContext'
import firebaseReducer from './firebaseReducer'
import {
	ADD_TODO,
	FETCH_TODOS,
	REMOVE_TODO,
	SET_TODO_LIST,
	SHOW_LOADER,
} from '../types'

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
		let maxOrder = state.todos.length
		const todo = {
			title,
			order: maxOrder++,
			complite: false,
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

	async function compliteTodo(id) {
		const todo = state.todos.find(todo => todo.id === id)
		todo.complite = !todo.complite

		await axios
			.patch(`${url}/todos/${id}.json`, todo)
			.then(() => {
				if (todo.complite === true) {
					alert.showAlert('Woohoo!', 'success')
				} else {
					alert.showAlert('So bad :(', 'light')
				}
			})
			.catch(() => {
				alert.showAlert('Something went wrong', 'danger')
			})
	}

	async function changeTodo(id, title) {
		const todo = state.todos.find(todo => todo.id === id)
		todo.title = title

		try {
			axios.patch(`${url}/todos/${id}.json`, todo)
		} catch (e) {
			throw new Error(e.message)
		}
	}

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

	async function setTodoList(e, todo, currentTodo) {
		e.preventDefault()
		const newList = state.todos.map(t => {
			if (t.id === todo.id) {
				return { ...t, order: currentTodo.order }
			}
			if (t.id === currentTodo.id) {
				return { ...t, order: todo.order }
			}
			return t
		})

		try {
			await axios.put(`${url}/todos.json`, newList).then(() => {
				alert.showAlert('success', 'success')
			})

			dispatch({
				type: SET_TODO_LIST,
				payload: newList,
			})
		} catch (e) {
			alert.showAlert('Something went wrong', 'danger')
			throw new Error(e.message)
		}

		// e.target.style.background = '1'
	}

	return (
		<FirebaseContext.Provider
			value={{
				showLoader,
				fetchTodos,
				addTodo,
				removeTodo,
				compliteTodo,
				changeTodo,
				setTodoList,
				todos: state.todos,
				loading: state.loading,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	)
}

export default FirebaseState
