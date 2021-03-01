import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Navbar from './components/NavBar'
import List from './components/List'
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
  const history = useHistory()
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
  const [username, setUsername] = useState('')
  const [title, setListTitle] = useState('')
  const [createdURL, setCreatedURL] = useState('')

  function createList() {
    let newList = [...gameList]
    //if payload.title == undefined....
    let payload = {
      title: title,
      user: username,
      list: newList,
    }

    axios.post('http://top10maker.com/create', payload).then((response) => {
      const object = response.data
      const url = object._id

      setCreatedURL(url)
      history.push(`/list/${url}`)
    })
  }

  function handleDragEndGlobal(oldGlobalIndex: number, newGlobalIndex: number) {
    let newArr = [...gameList]
    newArr = arrayMove(newArr, oldGlobalIndex, newGlobalIndex)
    setGames(newArr)
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
      <header className="App-header">
        <Navbar></Navbar>
      </header>
      <main className="App-main">
        <Route path="/" exact>
          <List addGame={addGame} dltGame={dltGame} gameList={gameList}
            handleDragEndGlobal={handleDragEndGlobal} username={username}
            setListTitle={setListTitle} setUsername={setUsername}
            createList={createList}></List>
        </Route>
        <Route path="/explore">
          <Explore></Explore>
        </Route>
        <Route path="/list/:id">
          <ListWebpage></ListWebpage>
        </Route>
      </main>

    </div>
  );
}

export default App;
