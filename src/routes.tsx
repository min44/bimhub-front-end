import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { InfoPage } from './pages/InfoPage'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route component={InfoPage} path="/" exact />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route component={AuthPage} path="/" exact />
      <Redirect to="/" />
    </Switch>
  )
}
