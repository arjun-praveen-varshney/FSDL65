import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(()=>{
alert("Good Morning!")
  }, [])

  useEffect(()=>{
alert("I greeted you Good morning!")
  }, [count])

  useEffect(()=>{
alert("Greet me back!")
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {count}
          <button onClick={()=>setCount(count+1)}>Increment Count</button>
          <button onClick={()=>setCount(count-1)}>Decrement Count</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Already know React? Teach us!
        </a>
      </header>
    </div>
  );
}

export default App;
