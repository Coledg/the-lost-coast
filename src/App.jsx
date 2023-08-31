import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const incrementCount = () => {
    setCount(prev => prev + 1);
  }
  return (
    <>
      <h1>Count is {count}</h1>
      <button onClick={incrementCount}>Increment</button>
    </>
  )
}

export default App
