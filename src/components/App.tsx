import React, { useContext, useReducer } from 'react'
import { Navbar } from './Navbar'
import { useRoutes } from '../routes'
import { AuthContext, ReducerContext } from '../context'
import reducer from '../reducer'

const App: React.FC = () => {
  const initialState = useContext(AuthContext)
  const [state, dispatch] = useReducer(reducer, initialState.state)
  const { isAuthenticated } = state
  const routes = useRoutes(isAuthenticated)

  return (
    <div className="App">
      <AuthContext.Provider value={{ state }}>
        <ReducerContext.Provider value={{ dispatch }}>
          {isAuthenticated && <Navbar />}
          {routes}
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
