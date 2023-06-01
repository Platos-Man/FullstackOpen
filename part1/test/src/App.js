
const Hello = (props) => {
  const name = props.name
  const age = props.age

  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Jack'
  const age = 26

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Sam" age={25 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App;
