import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import { ReducerContext } from '../context'

interface Props {}

export const Navbar: React.FC<Props> = () => {
  const [tabs, setTabs] = useState([
    { active: false, title: 'Profile', linkTo: '/profile' },
    { active: false, title: 'Settings', linkTo: '/settings' },
    { active: true, title: 'Home', linkTo: '/' },
  ])
  const history = useHistory()
  const { dispatch } = useContext(ReducerContext)

  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    dispatch({ type: 'LOG_OUT' })
    localStorage.removeItem(AUTH_TOKEN)
    history.replace('/')
  }

  const tabToggle = (tabIndex: any) => {
    const newTabs = tabs.map((tab, index) => {
      if (index === tabIndex) {
        tab.active = true
      } else {
        tab.active = false
      }
      return tab
    })
    setTabs(newTabs)
  }

  return (
    <div className="navbar">
      <div className="navbarmaxwidth">
        <ul>
          <li>
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
          {tabs.map((tab, index) => (
            <li key={index} className={tab.active ? 'someact' : ''} onClick={() => tabToggle(index)}>
              <NavLink to={tab.linkTo}>{tab.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
