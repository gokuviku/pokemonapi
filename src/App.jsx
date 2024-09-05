import { useState } from 'react'
import './App.css'
import Pokemon from './Pokemon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pokemon/>
    </>
  )
}

export default App
