import { useState } from 'react'
import { useFoodsContext } from '../hooks/useFoodsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const FoodForm = () => {
  const { dispatchFood } = useFoodsContext()
  const { user } = useAuthContext()


  const [title, setTitle] = useState('')
  const [calories, setCalories] = useState('')
  const [time, setTime] = useState('')
  const[description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const food = {title, calories, time, description}
    
    const response = await fetch('/api/foods', {
      method: 'POST',
      body: JSON.stringify(food),
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
      setCalories('')
      setTime('')
      setDescription('')
      dispatchFood({type: 'CREATE_FOOD', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Meal</h3>

      <label className='color'>Food:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label className='color'>Calories:</label>
      <input 
        type="number" 
        onChange={(e) => setCalories(e.target.value)} 
        value={calories}
        className={emptyFields.includes('calories') ? 'error' : ''}

      />

      <label className='color'>Time:</label>
      <input 
        type="text" 
        onChange={(e) => setTime(e.target.value)} 
        value={time} 
        className={emptyFields.includes('time') ? 'error' : ''}
      />

    <label className='color'>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description} 
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <button>Add Meal</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default FoodForm