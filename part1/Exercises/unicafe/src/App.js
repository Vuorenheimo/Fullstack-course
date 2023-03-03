import { useState } from 'react';

const Statistics = (props) => {
  const total = props.reviews.good + props.reviews.neutral + props.reviews.bad;
  const average = (props.reviews.good - props.reviews.bad) / total;
  const positive = ((props.reviews.good / total) * 100) + ' %';

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>

      <table>
        <tbody>
        <Statisticline text = {"good"} value = {props.reviews.good}/>
        <Statisticline text = {"neutral"} value = {props.reviews.neutral}/>
        <Statisticline text = {"bad"} value = {props.reviews.bad}/>
        <Statisticline text = {"all"} value = {total}/>
        <Statisticline text = {"average"} value = {average}/>
        <Statisticline text = {"positive"} value = {positive}/>
        </tbody>
      </table>
    </div>
  );
}

const Statisticline = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  );
}

const Button = ({text, handleClick}) => (<button onClick={handleClick}>{text}</button>)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text = {"good"} handleClick = {() => setGood(good + 1)}/>
      <Button text = {"neutral"} handleClick = {() => setNeutral(neutral + 1)}/>
      <Button text = {"bad"} handleClick = {() => setBad(bad + 1)}/>
      <Statistics reviews = {{good: good, neutral: neutral, bad: bad}}/>
    </div>
  );
}

export default App