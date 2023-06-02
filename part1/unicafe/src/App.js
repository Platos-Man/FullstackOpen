import { useState } from "react";

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad !== 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <tr><td>all</td><td>{good + bad + neutral}</td></tr>
            <tr><td>average</td><td>{(good - bad) / (good + bad + neutral)}</td></tr>
            <tr><td>positive</td><td>{good * 100 / (good + bad + neutral)} %</td></tr>
          </tbody>
        </table >
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const goodUp = () => setGood(good + 1)
  const neutralUp = () => setNeutral(neutral + 1)
  const badUp = () => setBad(bad + 1)
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodUp}>
        good
      </button>
      <button onClick={neutralUp}>
        neutral
      </button>
      <button onClick={badUp}>
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
