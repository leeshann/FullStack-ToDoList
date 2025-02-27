import { useEffect, useState } from 'react'
import EditToDo from './editToDo'

export default function ToDoList() {

    const [toDoList, setToDoList] = useState([])

    useEffect(() => {
        getToDosFromDB()
    }, [])


    async function getToDosFromDB() {
        try {
            const response = await fetch("http://localhost:3094/todo",
            {
                method: "GET"
            }
        )
        const data = await response.json()
        setToDoList(data)

        } catch (error) {
            console.error(error.message)
        }
    }

    async function handleDelete(e) {
        try {
            const id = e.target.parentElement.parentElement.id
            await fetch(`http://localhost:3094/todo/${id}`,
            {
                method: "DELETE"
            })
            window.location = "/"
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {toDoList.map((item) => {
                        return <tr key={item.todo_id} id={item.todo_id}>
                                    <td>{item.description}</td>
                                    <td><EditToDo id={item.todo_id}/></td>
                                    <td><button className='delete-button' onClick={handleDelete}>Delete</button></td>
                                </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}