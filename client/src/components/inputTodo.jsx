import { useState } from 'react'

export default function InputTodo() {
    const [description, setDescription] = useState("")

    function handleChange(e) {
        const inputValue = e.target.value
        setDescription(inputValue)
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const body = {description}
            const response = await fetch("http://localhost:3094/todo",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                }
            )
            window.location = "/"
        } catch (error) {
            console.error(error.message)
        }
    }

    // console.log(description)

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input className="input" type="text" name="description" placeholder="input todo" value={description} onChange={handleChange}/>
            <button className="add-btn" type="submit" >Add</button>
        </form>
    )
}