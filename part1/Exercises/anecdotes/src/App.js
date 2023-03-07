import { useState } from 'react';

const randomAnecdote = (len) => Math.floor(Math.random() * len);

const updateValues = (object, current) => {
  const update = {...object};
  update[current] += 1;

  return update;
}

const Header = (props) => (<h1>{props.text}</h1>);

const Content = ({anecdotes, points, selected}) => {
  return (
    <div>
      {anecdotes[selected]} <br></br>
      has {points[selected]} votes <br></br>
    </div>
  )
}

const BestAnecdote = ({object, list}) => {
  const max = Math.max(...Object.values(object));
  if (max === 0) {
    return (
      <div>
        no votes yet
      </div>
    )
  }

  let index = 0;
  for (const key in object) {
    if (object[key] === max) {
      index = key;
    }
  }

  return (
    <div>
      {list[index]} <br></br>
      has {max} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Object.fromEntries(anecdotes.map((anecdote, index) => [index, 0])));

  return (
    <div>
      <Header text = {"Anecdote of the day"}/>
      <Content anecdotes = {anecdotes} points = {points} selected = {selected}/>
      <button onClick={() => setPoints(updateValues(points, selected))}>vote</button>
      <button onClick={() => setSelected(randomAnecdote(anecdotes.length))}>next anecdote</button>

      <Header text = {"Anecdote with most votes"}/>
      <BestAnecdote object = {points} list = {anecdotes}/>
    </div>
  )
}

export default App