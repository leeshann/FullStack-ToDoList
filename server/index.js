const express = require('express')
const app = express();
const cors = require('cors')
const pool = require('./database.js')

// MIDDLEWARE
app.use(cors()) //cross origin requests
app.use(express.json()) //req.body


// ROUTES

// CREATE TODO
app.post('/todo', async (req, res) => {
    //create a table entry for task
    //send response back to client to confirm creation
    try {
        console.log(req.body)
        const { description } = req.body
        const newToDo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", 
            [description]
        )
        // because of the REUTNING * key word, we get back a lot of data in postman, but we only want to return the object in "rows"
        res.json(newToDo.rows[0]) 
    } catch (error) {
        console.error(error.message)
    }
})

// GET ALL TODOS
app.get('/todo', async (req, res) => {
    try {
        const allToDos = await pool.query(
            "SELECT * FROM todo ORDER BY todo_id ASC;"
        )        
        console.log("requested all todos")
        res.json(allToDos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// GET TODO 
app.get('/todo/:id', async (req, res) => {
    const { id } = req.params
    try {
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        )
        res.json(todo.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// UPDATE TODO
app.put('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const todo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *;",
            [description, id]
        )
        res.status(200).json( {success: true, message: "Task updated"} )
    } catch (error) {
        console.error(message.error)
    }
})

// DELETE TODO
app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query(
            "DELETE FROM todo WHERE todo_id = $1;",
            [id]
        )
        console.log("requested deleted")
        res.status(200).json( {success: true, message: "Task has been deleted!"} )
    } catch (error) {
        console.error(message.error)
    }
})

app.listen(3094, () => console.log("Server is listening on port 3094..."))