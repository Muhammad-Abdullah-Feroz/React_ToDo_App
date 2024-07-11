import { useState , useEffect } from 'react'
import './App.css'
import Navbar from "./components/navbar"
import { v4 as uuidv4 } from 'uuid';


function App() {
	const [showFinished, setShowFinished] = useState(true)
	const [todo, setTodo] = useState("")
	const [todos, setTodos] = useState([])
	
	useEffect(() => {
		let todoStr = localStorage.getItem("todos");
		if (todoStr){
			let todos = JSON.parse(localStorage.getItem("todos"))
			setTodos(todos)
		}
	}, [])
	

	const saveToLS = () => {
	  localStorage.setItem("todos",JSON.stringify(todos))
	  console.log("saved")
	}

	const handleChange = (e) => {
		setTodo(e.target.value)
	}
	const handleFinish = () => {
	  setShowFinished(!showFinished)
	}
	
	const handleAdd = () => {
		if (todo != "") {
			setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
			setTodo("")
			console.log(todos)
		}
		saveToLS();
	}
	const handleCheck = (e) => {
		let id = e.target.id;
		let index = todos.findIndex(item => {
			return item.id == id;
		})
		let newTodos = [...todos]
		newTodos[index].isCompleted = !newTodos[index].isCompleted
		setTodos(newTodos)
	}
	const handleEdit = (id) => {
		let index = todos.findIndex(item=>{
			return item.id == id
		})
		console.log(id)
		console.log(todos[index].todo) 
		setTodo(todos[index].todo) 
		handleDelete(id,"EDIT");
	}
	const handleDelete = (id , cause) => {
		console.log(id)
		let del = confirm(`Do you want to ${cause} this task ?`);
		if (del) {
			let newTodos = todos.filter(item => {
				return item.id != id
			})
			setTodos(newTodos)
		}
		saveToLS();
	}

	return (
		<>
			<Navbar />
			<div className="min-h-[80vh] bg-violet-200 rounded-xl px-12 py-2 my-9 mx-24">
				<div className="add-todo my-5">
					<h1 className="text-lg font-bold my-1">Add a ToDo</h1>
					<div className="input-box flex flex-row text-xl justify-center">
						<input onChange={handleChange} value={todo} className='w-10/12 py-1 px-2 rounded-lg' type="text" />
						<button onClick={handleAdd} className='mx-3'>Add</button>
					</div>
				</div>
				<h1 className='text-lg font-bold'>Your ToDos</h1>
				<input type="checkbox" className='m-2' onChange={handleFinish} name="showFinished" checked={showFinished} id="" /><label className='mx-2' htmlFor="showFinished"> Show Finished Tasks</label>
				<div className="todos">
					{todos.length == 0 && <div className='font-bold text-xl text-center my-8'>No Todos to show</div>}
					{
						todos.map((item) => {
							return (showFinished || !item.isCompleted) && (
								<div key={item.id} className="todo my-3 mx-auto flex w-11/12 text text-xl justify-between items-center">
									<input  type="checkbox" id={item.id} name="check" checked={item.isCompleted} onChange={handleCheck} />
									<div className={item.isCompleted ? "line-through w-[70%]" : "w-[70%]"}>{item.todo}</div>
									<div className="buttons mx-3 flex gap-3">
										<button onClick={()=>handleEdit(item.id)}>Edit</button>
										<button onClick={() => handleDelete(item.id , "DELETE")}>Delete</button>
									</div>
								</div>
							)
						}
						)
					}
				</div>

			</div>
		</>
	)
}

export default App