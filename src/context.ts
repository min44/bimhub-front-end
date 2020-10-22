import { AUTH_TOKEN } from './constants'
import { createContext } from 'react'

const isAuthenticated = localStorage.getItem(AUTH_TOKEN) ? true : false

export const AuthContext = createContext<{
  state: any
}>({
  state: { isAuthenticated },
})

export const ReducerContext = createContext<{
  dispatch: any
}>({
  dispatch: () => null,
})
