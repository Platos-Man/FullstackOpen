import { useState } from "react"
const App = () => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with bebsi value', counter)
  const giveBebis = () => { setCounter(counter + 1); console.log('increasing, Bebis before', counter) }
  const noPebis = () => { setCounter(0); console.log('resetting to zero(not coke zero), Pebis before', counter) }
  const lessPepis = () => { setCounter(counter - 1); console.log('decreasing, Pepis before', counter) }

  return (
    <div>
      <div>{counter} Bebsi amount🥤🔴➕🔵</div>
      <button onClick={giveBebis}>
        give Bebis 😳
      </button>
      <button onClick={lessPepis}>
        less Pepis 😑
      </button>
      <button onClick={noPebis}>
        no Pebis 😠
      </button>
    </div>
  )
}

export default App