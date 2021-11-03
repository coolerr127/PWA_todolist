import React from 'react'

import Form from './components/Form'
import ToDos from './components/ToDos'
import Alert from './components/Alert'

function App() {
	const toDos = [
		{id: 1, title: 'Hello1'},
		{id: 2, title: 'Hello2'},
		{id: 3, title: 'Hello3'}
	]
	// const alert = {type: 'warning', message: 'Yx ti blia'}
	const alert = null

	return (
		<div className='container p-3'>
			<Alert alert={alert}/>
			<Form/>
			<ToDos toDos={toDos}/>
		</div>
	)
}

export default App
