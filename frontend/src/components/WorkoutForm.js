import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutForm = () => {
  const {dispatch} = useWorkoutsContext()
  const { user } = useAuthContext()


  const [title, setTitle] = useState('')
  const [reps, setReps] = useState('')
  const [set, setSet] = useState('')
  const[weight, setWeight] = useState('')
  const[description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {title, reps, set, weight, description}
    
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setReps('')
      setSet('')
      setWeight('')
      setDescription('')
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label className='color'>Exercise:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label className='color'>Number of reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}

      />

      <label className='color'>Number of sets:</label>
      <input 
        type="number" 
        onChange={(e) => setSet(e.target.value)} 
        value={set}
        className={emptyFields.includes('set') ? 'error' : ''}

      />

    <label className='color'>Weight (lbs):</label>
      <input 
        type="text" 
        onChange={(e) => setWeight(e.target.value)} 
        value={weight} 
        className={emptyFields.includes('weight') ? 'error' : ''}
      />

    <label className='color'>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description} 
        className={emptyFields.includes('description') ? 'error' : ''}

      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm