const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key = {part.id} part = {part}/>
    )}     
  </>

const Course = ({course}) => 
  <>
    <Header course = {course.name} />
    <Content parts = {course.parts} />
    <Total sum = {course.total} />
  </>

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
        name: 'Testing stuff',
        exercises: 9,
        id: 3
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 4
      },
      {
        name: 'More!',
        exercises: 40,
        id: 5
      }
    ]
  }

  course.total = course.parts.reduce((total, part) => total + part.exercises, 0);
  console.log(course);

  return <Course course={course} />
}

export default App