import React from 'react';
import List from './components/List'
import Social from './components/Social'
import Share from './components/Share'
import './css/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Top 10 Maker
        </h1>
      </header>
      <main className="App-main">
        <Social></Social>
        <List></List>
        <Share></Share>
      </main>
    </div>
  );
}

export default App;
