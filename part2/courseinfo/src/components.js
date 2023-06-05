const Total = ({ parts }) => <b>total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</b>

const Part = (part) => <div key={part.id}>{part.name} {part.exercises}</div>

const Content = ({ parts }) => parts.map(Part)

const Header = ({ name }) => <h2>{name}</h2>

const Course = ({ name, parts, id }) => {
    return (
        <div key={id}>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

const Courses = ({ courses }) => courses.map(Course)

export default Courses