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
      backgroundColor: theme.palette.background.paper,
    },
    paperChildren: {
      borderBottom: '1px solid',
    },
  }),
);

function ListItem(props: any) {
  const [search, setSearch] = useState(``);
  const [results, setResults] = useState([])
  const [visible, setVisible] = useState(false);

  const classes = useStyles();
  const searchEl = useRef() as React.MutableRefObject<HTMLInputElement>;

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

  // FETCH CONFIG BELOW
  async function gameRequest(event: any) {
    await setSearch(event.target.value)
    const data = `search "${search}"; fields name,cover,summary;`
    const request = new Request(
      "https://mysterious-beach-94424.herokuapp.com/https://oj9aui1qpi.execute-api.us-west-2.amazonaws.com/production/v4/games",
      {
        method: 'POST',
        body: data
      });
    await fetch(request)
      .then((response) => {
        response.json().then(data => {
          // map stuff here. Change UI?? Needs to be per search result (each item in "Promiseresult" array)
          // index: number
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
        <img className="itemImage" alt="Video game cover" src=""></img>
        <h1 className="itemTitle">Game title here</h1>
        <input
          className="itemSearch"
          placeholder="search games here..."
          value={search}
          onChange={gameRequest}
          ref={searchEl}
        >
        </input>
        { visible ? <Popper 
            className={classes.paper} 
            id={'popper'} 
            open={true}
            z-index={100}
            anchorEl={searchEl.current}
            placement="bottom"
            disablePortal={true}>

              {results.map((games: any, index: number) => {
                return <div>
                  <h1>{games.name}</h1>
                  <h2>{games.summary}</h2>
                  </div>
              })}
            </Popper> : null }
        <p className="itemReview">Your review here</p>
      </div>
      <div className="item-Footer">Trash button here</div>
    </div>
  );
}

export default ListItem;
