import React, {useState, useEffect} from 'react';
import List from './components/List'
import Social from './components/Social'
import Share from './components/Share'
import './css/App.css';
import {arrayMove} from "@dnd-kit/sortable";

type Game = {
  id: number,
  cover: string,
  title: string,
  description: string,
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

  function handleDragEndGlobal(oldGlobalIndex: number, newGlobalIndex: number){
    let newArr = [...gameList]
    newArr = arrayMove(newArr, oldGlobalIndex, newGlobalIndex)
    setGames(newArr)
    console.log(`JUST MOVED GAMES${gameList}`)
  }

  function addGame(gameIndex: number, propGame: Game){
    console.log(`the index is ${gameIndex}`)
    let newArr = [...gameList]
    newArr[gameIndex] = propGame

    setGames(newArr)
    console.log(gameList)
  }
  function dltGame(gameIndex: number){

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
        <List addGame={addGame} gameList={gameList} handleDragEndGlobal={handleDragEndGlobal}></List>
        <Share></Share>
      </main>
    </div>
  );
}

export default App;
