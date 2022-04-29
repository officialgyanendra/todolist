import { useState } from "react";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";

function App() {
	const [showAddTodoPopup, setShowAddTodoPopup] = useState(false);
	const [showEditTodoPopup, setShowEditTodoPopup] = useState(false);
	const [todos, setTodos] = useState([]);
	const [searchText, setSearchText] = useState("");

	const [editTodoData, setEditTodo] = useState({});

	const openAddPopup = () => {
		setShowAddTodoPopup(true);
	}
	const closeAddPopup = () => {
		setShowAddTodoPopup(false);
	}
	const addTodo = (name, email) => {
		setTodos([...todos, { name, email }]);
	}

	const openEditTodoPopup = (todo, index) => {
		setShowEditTodoPopup(true);
		setEditTodo({...todo, index});
	}
	const closeEditTodoPopup = () => {
		setShowEditTodoPopup(false);
		setEditTodo({});
	}

	const updateTodo = (name, email, index) => {
		const newTodos = [...todos];
		newTodos[index] = { name, email };
		setTodos(newTodos);
		closeEditTodoPopup();
	}
	const deleteTodo = (todo, index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	}
	
	return (
		<div className="container col-7">
			{/* Add todo popup */}
			{showAddTodoPopup && <AddTodo addTodo={addTodo} close={closeAddPopup}/>}
			{/* Edit todo popup */}
			{showEditTodoPopup && <EditTodo 
				todo={editTodoData} 
				updateTodo={updateTodo}
				close={closeEditTodoPopup}
			/>}
			{/* Todo list */}
			<div className="card">
				<div className="card-body">
					<div className="clearfix">
						<div className="float-start">
							{/* Search Todo */}
							<input 
								type="text" 
								className="form-control" 
								placeholder="Search todo"
								onChange={(e) => setSearchText(e.target.value)}
							/>
						</div>
						<div className="float-end">
							<button className="btn btn-primary" onClick={openAddPopup}>Add</button>
						</div>
					</div>
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{todos && todos.length > 0 && todos.filter((search)=> {
								return search.name.toLowerCase().includes(searchText.toLowerCase()) || search.email.toLowerCase().includes(searchText.toLowerCase());
							}).map((todo, index) => {
								return (
									<tr key={index}>
										<td>{todo.name}</td>
										<td>{todo.email}</td>
										<td>
											<i className="fa fa-pencil" onClick={() => openEditTodoPopup(todo, index)}/>
											<i className="fa fa-trash" onClick={() => deleteTodo(todo, index)}/>
										</td>
									</tr>
								);
							})}
							{todos && todos.length === 0 && <tr><td colSpan="3">No todo found</td></tr>}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default App;
