import React from 'react';
import List from './components/List'
import './css/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>any file</code> and save to reload.
        </p>
      </header>
      <main className="App-main">
        <List></List>
      </main>
    </div>
  );
}

export default App;
