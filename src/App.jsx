import { useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showForm, setShowForm] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetchTasks()
      setTasks(res)
    }

    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Update task
  const updateTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add task
  const addTask = async task => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // Delete task
  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter(task => {
      return task.id !== id
    }))
  }

  // Toggle reminder
  const toggleReminder = async id => {
    const taskToUpdate = await updateTask(id)
    const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    // Map through entire array
    setTasks(tasks.map(task => {
      // Return the id of the array element clicked
      return task.id === id 
      // For all tasks, change the reminder value to opposite of the array element if equal,
      ? { ...task, reminder: data.reminder } 
      // If not, then remain
      : task
    }))
  }

  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowForm(!showForm)} showForm={showForm}/>
        <Route path='/' exact render={(props) => {
          return (
            <>
              { showForm && <AddTask onAdd={addTask}/> }
              {
                tasks.length > 0 
                ? <Tasks tasks={tasks}  onDelete={deleteTask} onToggle={toggleReminder}/> 
                : 'No task to show'
              }
            </>
          )
        }}
        />
        <Route path='/about' component={About}/>
        <Footer />
      </div>
    </Router>
  )
}



export default App
