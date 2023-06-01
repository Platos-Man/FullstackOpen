
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old {'\u{1F346}'} {'\u{1F4A6}'} {'\u{1F4A6}'}
      </p>
    </div>
  )
}
const App = () => {
  const name = 'PeePeePooPoo'
  const age = 1

  return (
    <div>
      <Hello name='Sami' age={26 + 9} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App;
