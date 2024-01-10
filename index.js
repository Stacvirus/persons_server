// const http = require('http')
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
// to send a simple text through server
// const app = http.createServer((request, response) =>{
//     response.writeHead(200, {"Content-Type": "text/plain"})
//     response.end("Hello world!")
// })

// to send json type text
// const app = http.createServer((request, response) =>{
//     response.writeHead(200, {"Content-Type": "application/json"})
//     response.end(JSON.stringify(notes))
// })

// using the express library
const express = require("express")
const app = express()

app.get("/", (request, response) =>{
    response.send("<h1>Hello World</h1>")
})
app.get("/api/notes", (request, response) =>{
    response.json(notes)
})

// requesting a specific note
app.get('/api/notes/:id', (request, response) =>{
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note) response.json(note)
    else response.status(404).end()
})

// deleting a specific note
app.delete("/api/notes/:id", (request, response) =>{
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

//posting data in the server
app.use(express.json())
app.post("/api/notes/", (request, response) =>{
  const note = request.body
  console.log(note)
  response.json(note)
})

const PORT = process.env.PORT || 3005
app.listen(PORT, () =>{
    console.log("server running on port " + PORT)
})