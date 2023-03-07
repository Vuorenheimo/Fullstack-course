const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <h4>Total of {sum} exercises</h4>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key = {part.id} part = {part}/>
    )}     
  </>

const Course = ({courses}) => 
  <>
    <h1>Web development curriculum</h1>
    {courses.map(course =>
    <div key = {course.id}>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total sum = {course.parts.reduce((total, part) => total + part.exercises, 0)} />
    </div>
    )}
  </>

export default Course