import React, { useContext, useState } from 'react'
import { AUTH_TOKEN } from '../constants'
import { TextField } from '../components/Textfield'
import { useHistory } from 'react-router-dom'
import { gql, useMutation, ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { ReducerContext } from '../context'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`
const SIGNIN_MUTATION = gql`
  mutation SigninMutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }
`

export const AuthPage: React.FC = () => {
  //States
  const [signinForm, setSigninForm] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  // const [errors, setErrors] = useState({ errorName: '', errorEmail: '', errorPassword: '' })
  const [errorInput, setErrorInput] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const submitIsAvailable: boolean = signinForm ? (!!email && !!password) : (!!email && !!password && !!name)

  const history = useHistory()
  const { dispatch } = useContext(ReducerContext)

  const [signup] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => confirm(data),
    onError: (error: ApolloError) => riseError(error),
  })
  const [signin] = useMutation(SIGNIN_MUTATION, {
    onCompleted: (data) => confirm(data),
    onError: (error: ApolloError) => riseError(error),
  })

  const riseError = (error: any) => {
    error.graphQLErrors.forEach((graphQLError: GraphQLError) => {
      const errorName = graphQLError.name
      if (errorName.includes('NameError')) {
        setErrorName(graphQLError.message)
        setName('')
      }
      if (errorName.includes('EmailError')) {
        setErrorEmail(graphQLError.message)
        setEmail('')
      }
      if (errorName.includes('PasswordError')) {
        setErrorPassword(graphQLError.message)
        setName('')
      }
      // errorName.includes('NameError') && setErrorName(graphQLError.message)
      // errorName.includes('EmailError') && setErrorEmail(graphQLError.message)
      // errorName.includes('PasswordError') && setErrorPassword(graphQLError.message)
    })
    setErrorInput('PLEASE VERIFY YOUR DETAILS AND TRY AGAIN')
  }

  const onSubmitHandler = async () => {
    signinForm ? signin({ variables: { email, password } }) : signup({ variables: { name, email, password } })
  }

  const confirm = (data: any) => {
    const { token } = signinForm ? data.signin : data.signup
    dispatch({ type: 'LOG_IN' })
    saveUserData(token)
    history.replace('/')
  }

  const saveUserData = (token: any) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  const resetErrors = () => {
    setErrorInput('')
    setErrorName('')
    setErrorEmail('')
    setErrorPassword('')
  }

  const onFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    resetErrors()
  }

  return (
    <React.Fragment>
      <div className="authcontainer">
        <h2 style={{ margin: '10px 0px', color: 'gray' }}>{signinForm ? 'Sign In' : 'Sign Up'}</h2>
        {!signinForm && (
          <TextField
            error={!!errorName}
            helpertext={errorName}
            value={name}
            placeholder="Your name"
            onChangeValueHandler={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && submitIsAvailable && onSubmitHandler()}
            onFocus={onFocusHandler}
          />
        )}
        <TextField
          error={!!errorEmail}
          helpertext={errorEmail}
          value={email}
          placeholder="Your email"
          onChangeValueHandler={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && submitIsAvailable && onSubmitHandler()}
          onFocus={onFocusHandler}
        />
        <TextField
          error={!!errorPassword}
          helpertext={errorPassword}
          type="password"
          value={password}
          placeholder="Password"
          onChangeValueHandler={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && submitIsAvailable && onSubmitHandler()}
          onFocus={onFocusHandler}
        />
        <div style={{ color: 'red' }}>{errorInput}</div>
        <button disabled={!submitIsAvailable} onClick={onSubmitHandler} className="submit">
          Submit
        </button>
        <button
          onClick={() => {
            setSigninForm((prev) => !prev)
            resetErrors()
          }}
          className="submit signuptoggle"
        >
          {signinForm ? 'need to create an account?' : 'already have an account?'}
        </button>
      </div>
    </React.Fragment>
  )
}
