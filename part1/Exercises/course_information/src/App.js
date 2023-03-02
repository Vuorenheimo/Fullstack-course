const Header = props => {
  return (
    <h1>{props.course}</h1>
  );
}

const Part = props => {
  return (
    <p>{props.part} {props.exercises}</p>
  );
}

const Content = (props) => {
  const part1 = `${props.parts[0].name} ${props.parts[0].exercises}`;
  const part2 = `${props.parts[1].name} ${props.parts[1].exercises}`;
  const part3 = `${props.parts[2].name} ${props.parts[2].exercises}`;

  return (
    <div>
      <Part part={part1}/>
      <Part part={part2}/>
      <Part part={part3}/>
    </div>
  );
}

const Total = props => {
  let total = null;
  props.parts.map(part => total += part.exercises)
  return (
    <p>Number of exercises {total}</p>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App