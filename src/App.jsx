import { useState } from 'react'
import './App.css'
//Se importa componontes de IMDB
import NavBar from './components/navbar/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavBar />
    </div>
  )
}

export default App
