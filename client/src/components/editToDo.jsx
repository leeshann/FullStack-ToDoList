import { useState } from 'react'

export default function EditToDo(props) {

    const [description, setDescription] = useState("")

    function handleChange(e) {
        setDescription(e.target.value)
    }

    // console.log(description)

    async function handleUpdate(e) {
        try {
            const body = {description}
            console.log(props.id)
            
            const response = await fetch(`http://localhost:3094/todo/${props.id}`,
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            // console.log(response)
            window.location = "/"
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${props.id}`}>
            Edit
            </button>

            <div class="modal fade" id={`exampleModal${props.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                            <input className="input" type="text" placeholder="enter new task" value={description} onChange={handleChange}/>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
</>
    )
}