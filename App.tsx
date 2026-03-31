import AuthStack from './navigation/AuthStack.js'
import MainStack from './navigation/MainStack.js'


export default function App() {
  const isLogged = true
  return isLogged ? <MainStack/> : <AuthStack/>;
}
