import React, { useState, useRef } from "react";
import "../css/ListItem.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: '1px solid',
      padding: theme.spacing(1),
      maxHeight: '400px',
      maxWidth: '400px',
      overflowY: 'scroll',
      backgroundColor: theme.palette.background.paper,
    },
    paperChildren: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      borderBottom: '1px solid',
      padding: theme.spacing(1),
      maxHeight: '160px',
    },
    paperImg: {
      gridArea: '1 / 1 / 4 / 2',
      backgroundColor: 'khaki',
      cursor: 'pointer',
      height: '100%',
      width: '100%'
    },
    paperH1: {
      gridArea: '1 / 2 / 2 / 4',
      backgroundColor: 'rgb(143, 240, 140)',
    },
    paperH2: {
      gridArea: '2 / 2 / 4 / 4',
      overflowY: 'scroll',
      backgroundColor: 'rgb(140, 195, 240)',
    }
  }),
);

function ListItem(props: any) {
  const [search, setSearch] = useState(``);
  const [results, setResults] = useState<any[]>([])
  const [visible, setVisible] = useState(false);
  const [gameItem, setGame] = useState({
    cover: undefined,
    title: undefined,
    description: undefined,
  })

  const classes = useStyles();
  const searchEl = useRef() as React.MutableRefObject<HTMLInputElement>;

  // DndKit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  // DndKit

  function handleSearch() {
    setVisible(false)
  }
  function selectGame(event: any) {
    // Once game is clicked, it will populate to the listItem.
    let index = parseInt(event.currentTarget.id)
    let game = results[index]
    console.log(index)
    
    setGame({
     cover: game.cover.url,
     title: game.name,
     description: game.summary,
    })
    setVisible(false)
  }

// FETCH CONFIG BELOW
  async function gameRequest(event: any) {
    await setSearch(event.target.value)
    const data = `search "${search}"; fields id,name,cover.url,summary;`
    const request = new Request(
      "https://mysterious-beach-94424.herokuapp.com/https://oj9aui1qpi.execute-api.us-west-2.amazonaws.com/production/v4/games",
      {
        method: 'POST',
        body: data
      });
    await fetch(request)
      .then((response) => {
        response.json().then(data => {
          setResults(data)
          console.log(results)
          setVisible(true)
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }
// FETCH CONFIG ABOVE

  return (
    <div className="item-Root" ref={setNodeRef} style={style}>
      <div className="item-Header" {...attributes} {...listeners}>
        Click here to drag!
      </div>
      <div className="item-Main">
        <img className="itemImage" alt="Video game cover" src={gameItem.cover}></img>
        <h1 className="itemTitle" placeholder="The title will go here...">
          {gameItem.title} <br></br>
          {gameItem.description}
          </h1>
        <input
          className="itemSearch"
          placeholder="search for games here..."
          value={search}
          onChange={gameRequest}
          ref={searchEl}
        >
        </input>
        {visible ? <Popper
          className={classes.paper}
          id={'popper'}
          open={visible}
          z-index={100}
          anchorEl={searchEl.current}
          placement="bottom"
          disablePortal={true}
          >
            <button onClick={handleSearch}>Close Results</button>
          {results.map((games: any, index: number) => {
            return <div className={classes.paperChildren} id={`${index}`} key={index} onClick={selectGame}>
              <img
                className={classes.paperImg}
                alt="Video game cover"
                src={games.cover.url}
              ></img>
              <h1 className={classes.paperH1}>{games.name}</h1>
              <h2 className={classes.paperH2}>{games.summary}</h2>
            </div>
          })}
        </Popper> : null}
        <input className="itemReview" placeholder="Type out your thoughts on this game!"></input>
      </div>
      <div className="item-Footer">Trash button here</div>
    </div>
  );
}

export default ListItem;
