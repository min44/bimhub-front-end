export default function reducer(state: any, action: any) {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticated: true,
      }
    case 'LOG_OUT':
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      throw new Error()
  }
}
