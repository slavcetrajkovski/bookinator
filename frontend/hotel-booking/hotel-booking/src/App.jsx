import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AddRoom from "./components/room/AddRoom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddRoom />
    </>
  )
}

export default App
