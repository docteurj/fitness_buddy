import { createContext, useReducer } from 'react'

export const FoodsContext = createContext()

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FOODS':
      return { 
        foods: action.payload 
      }
    case 'CREATE_FOOD':
      return { 
        foods: [action.payload, ...state.foods] 
      }
      case 'DELETE_FOOD':
        return { 
          foods: state.foods.filter(f => f._id !== action.payload._id) 
        }
    default:
      return state
  }
}

export const FoodsContextProvider = ({ children }) => {
  const [state, dispatchFood] = useReducer(foodsReducer, { 
    foods: null
  })
  
  return (
    <FoodsContext.Provider value={{ ...state, dispatchFood }}>
      { children }
    </FoodsContext.Provider>
  )
}