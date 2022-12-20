import { useFoodsContext } from '../hooks/useFoodsContext'
import { useAuthContext } from '../hooks/useAuthContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const FoodDetails = ({ food }) => {
  const { dispatchFood } = useFoodsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    const response = await fetch('/api/foods/' + food._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatchFood({type: 'DELETE_FOOD', payload: json})
    }
  }


    return (
      <div className="food-details">
        <h4>{food.title}</h4>
        <p><strong>Type: </strong>Food</p>
        <p><strong>Calories (cal): </strong>{food.calories}</p>
        <p><strong>Meal of Day: </strong>{food.time}</p>
        <p><strong>Description: </strong>{food.description}</p>
        <p>{formatDistanceToNow(new Date(food.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default FoodDetails