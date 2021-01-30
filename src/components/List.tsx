import React, { useState } from "react";
import "../css/List.css";
import ListItem from "./ListItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSwappingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {restrictToVerticalAxis, restrictToWindowEdges,} from '@dnd-kit/modifiers';
import plusCircle from '../assets/plus-circle-duotone.png'
//import { useSelector, useDispatch, MapDispatchToProps, MapStateToProps, connect } from 'react-redux'
//import store, {addGame, Game} from '../store'

function List(props: any) {
  const [items, setItems] = useState([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]);

//DnDKit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: "unique-id",
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
 


  function handleDragEnd(event: any) {
    const { active, over } = event;
    //sort items here
    if (active.id !== over.id) {
      setItems((items) => {
         const oldIndex = items.indexOf(active.id);
         const newIndex = items.indexOf(over.id);

        //  const gameIndex: number = newIndex
        //  props.addGame(gameIndex)

        return arrayMove(items, oldIndex, newIndex);
      });
      
    }
  }
//DnDKit

  return (
    <div className="list-Root">
      <div className="list-Header">
        <h1>Add Game</h1>
        <img
          className="createBtn"
          alt="Create new game listing button. Icon is a + with a circle around it."
          src={plusCircle}
          onClick={addIndex}></img>
      </div>
      <div className="list-Main">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={items} strategy={rectSwappingStrategy}>
            {items.map((id) => (
              <ListItem key={id} id={id} dltIndex={dltIndex} addGame={props.addGame} items={items}/>
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className="list-Footer"></div>
    </div>
  );

  function addIndex() {
    const last = parseInt(items[items.length - 1])
    const add = last + 1
    if (items.length > 9) {
      console.log('Max amount of games reached')
      return
    } else {
      setItems(items.concat(`${add}`))
    }
  }

  function dltIndex(id: string) {
    const index = id;
    const length = items.length
    if (length <= 1) {
      console.log('Cannot remove anymore games')
      return
    } else {
      setItems(items.filter(item => item != index))
    }
  }
}

export default List;
