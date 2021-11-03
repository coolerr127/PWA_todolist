import React from 'react'

function ToDos({ toDos }) {
	return (
		<ul class='list-group pt-3'>
			{toDos.map(toDo => (
				<li class='list-group-item todo' key={toDo.id}>
					{toDo.title}

					<button type='button' class='btn btn-outline-danger btn-sm'>
						&times;
					</button>
				</li>
			))}
		</ul>
	)
}

export default ToDos
