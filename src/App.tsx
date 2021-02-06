import React, {useState} from 'react';
import List from './components/List'
import Social from './components/Social'
import Share from './components/SharedList'
import './css/App.css';
import {arrayMove} from "@dnd-kit/sortable";
import axios from 'axios'

type Game = {
  id: number,
  cover: string,
  title: string,
  description: string,
  // user: {
  //   author: string,
  //   review: string
  // }
}

function App(props: any) {
  const [gameList, setGames] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  function createList(){
    
    let newArr = [...gameList]
    let json = JSON.stringify(newArr);
    console.log(json)
    console.log('TESTING MONGO CONNECTION')
    axios.post('http://localhost:3001', json)
  }

  function handleDragEndGlobal(oldGlobalIndex: number, newGlobalIndex: number){
    let newArr = [...gameList]
    newArr = arrayMove(newArr, oldGlobalIndex, newGlobalIndex)
    setGames(newArr)
    console.log(`JUST MOVED GAMES${gameList}`)
  }

  function addGame(gameIndex: number, propGame: Game){
    let newArr = [...gameList]
    newArr[gameIndex] = propGame
    setGames(newArr)
  }

  function dltGame(gameIndex: number){
    let newArr = [...gameList]
    newArr[gameIndex] = {}
    setGames(newArr)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Top 10 Maker
        </h1>
      </header>
      <main className="App-main">
        <Social></Social>
        <List addGame={addGame} dltGame={dltGame} gameList={gameList} 
        handleDragEndGlobal={handleDragEndGlobal}></List>
        <Share createList={createList}></Share>
      </main>
    </div>
  );
}

export default App;
