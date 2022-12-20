import { useEffect } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useFoodsContext } from "../hooks/useFoodsContext"
import { useAuthContext } from "../hooks/useAuthContext"



import WorkoutDetails from '../components/WorkoutDetails'
import FoodDetails from '../components/FoodDetails'
import WorkoutForm from '../components/WorkoutForm'
import FoodForm from '../components/FoodForm'



const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const { foods, dispatchFood } = useFoodsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {'Authorization': `Bearer ${user.token}`},
              })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if (user) {
            fetchWorkouts()
        }

        const fetchFoods = async () => {
            const response = await fetch('/api/foods', {
                headers: {'Authorization': `Bearer ${user.token}`},
              })
            const json = await response.json()

            if (response.ok) {
                dispatchFood({type: 'SET_FOODS', payload: json})
            }

        }
        if (user) {
            fetchFoods()
        } 
    }, [dispatch, dispatchFood, user])
    return (
        <div className="home">
            <div className="workouts">
            <h3>Workouts</h3>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
             <h3>Meals</h3>
                {foods && foods.map((food) => (
                    <FoodDetails key={food._id} food={food}/>
                ))}
            </div>
            <div>
                <WorkoutForm />
                <FoodForm />
            </div>
        </div>
    )
}

export default Home


