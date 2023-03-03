import { useState } from 'react';

const Statistics = (props) => {
  const total = props.reviews.good + props.reviews.neutral + props.reviews.bad;
  const average = (props.reviews.good - props.reviews.bad) / total;
  const positive = props.reviews.good / total;

  return (
    <div>
      <h1>statistics</h1>
      <div>good {props.reviews.good}</div>
      <div>neutral {props.reviews.neutral}</div>
      <div>bad {props.reviews.bad}</div>
      <div>all {total}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics reviews = {{good: good, neutral: neutral, bad: bad}}/>
    </div>
  );
}

export default App