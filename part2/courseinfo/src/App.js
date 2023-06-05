const Total = ({ parts }) => <b>total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</b>

const Part = (part) => <div>{part.name} {part.exercises}</div>

const Content = ({ parts }) => {
  return parts.map(Part);
}
const Header = ({ name }) => <h2>{name}</h2>

const Course = (props) => {
  const name = props.course.name
  const parts = props.course.parts
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Jeesus',
        exercises: 1,
        id: 4
      }
    ]
  }

  return <Course course={course} />

}

export default App;
