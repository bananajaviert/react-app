import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import  { useState } from 'react'

function App() {
  const [showForm, setShowForm] = useState(false)

  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: `Watch IZONE Chu Season 4`,
        day: `July 27th at 12:00 PM`,
        reminder: true
    },
    {
        id: 2,
        text: `Buy LOONA's new Album`,
        day: `July 27th at 1:30 PM`,
        reminder: true
    },
    {
        id: 3,
        text: `Learn MERN stack`,
        day: `July 27th at 3:00 PM`,
        reminder: false
    }
  ])

  // Add task
  const addTask = task => {
    const id = Math.floor(Math.random() * 10000)
    
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete task
  const deleteTask = id => {
    setTasks(tasks.filter(task => {
      return task.id !== id
    }))
  }

  // Toggle reminder
  const toggleReminder = id => {
    // Map through entire array
    setTasks(tasks.map(task => {
      // Return the id of the array element clicked
      return task.id === id 
      // For all tasks, change the reminder value to opposite of the array element if equal,
      ? { ...task, reminder: !task.reminder } 
      // If not, then remain
      : task
    }))
  }

  return (
    <div className='container'>
      <Header onAdd={() => setShowForm(!showForm)} showForm={showForm}/>
      { showForm && <AddTask onAdd={addTask}/> }
      {
        tasks.length > 0 
        ? <Tasks tasks={tasks}  onDelete={deleteTask} onToggle={toggleReminder}/> 
        : 'No task to show'
      }
    </div>
  )
}



export default App
