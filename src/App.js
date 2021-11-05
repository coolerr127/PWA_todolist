import React from 'react'

import Form from './components/Form'
import ToDos from './components/ToDos'
import Alert from './components/Alert'
import AlertState from './context/alert/AlertState'
import FirebaseState from './context/firebase/FirebaseState'

function App() {
	return (
		<AlertState>
			<FirebaseState>
				<div className='container p-3 bg-white text-dark'>
					<Form />
					<ToDos />
				</div>
			</FirebaseState>
			<Alert alert={alert} />
		</AlertState>
	)
}

export default App
