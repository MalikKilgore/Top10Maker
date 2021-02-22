import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Switch} from 'react-router-dom'
import Navbar from './components/NavBar'
import List from './components/List'
import Upload from './components/Upload'
import Explore from './components/Explore'
import ListWebpage from './components/ListWebpage'
import './css/App.css';
import { arrayMove } from "@dnd-kit/sortable";
import axios from 'axios'

type Game = {
  id: number,
  cover: string,
  title: string,
  description: string,
  user: {
    author: string,
    review: string
  }
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

  function createList() {
    let newArr = [...gameList]
    let json = JSON.stringify(newArr);
    let listDoc = {
      title: "Top 10 List Title will go here",
      user: "GUEST",
      list: json,
      url: "Shareable URL"
    }
    axios.post('http://top10maker.com/create', listDoc)
  }

  function handleDragEndGlobal(oldGlobalIndex: number, newGlobalIndex: number) {
    let newArr = [...gameList]
    newArr = arrayMove(newArr, oldGlobalIndex, newGlobalIndex)
    setGames(newArr)
    console.log(`JUST MOVED GAMES${gameList}`)
  }

  function addGame(gameIndex: number, propGame: Game) {
    let newArr = [...gameList]
    newArr[gameIndex] = propGame
    setGames(newArr)
  }

  function dltGame(gameIndex: number) {
    let newArr = [...gameList]
    newArr[gameIndex] = {}
    setGames(newArr)
  }

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar></Navbar>
        </header>
        <main className="App-main">
          <Route path="/" exact>
            <List addGame={addGame} dltGame={dltGame} gameList={gameList}
              handleDragEndGlobal={handleDragEndGlobal}></List>
            <Upload createList={createList}></Upload>
          </Route>
          <Route path="/explore" exact>
            <Explore></Explore>
          </Route>
          
            <Route path="/explore/lists/:id" exact>
              <ListWebpage></ListWebpage>
            </Route>
        </main>
      </Router>
    </div>
  );
}

export default App;
