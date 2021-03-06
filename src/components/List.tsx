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
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

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

  function createList() {
    props.createList()
  }

  //DnDKit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const oldGlobalIndex: number = items.indexOf(active.id)
    const newGlobalIndex: number = items.indexOf(over.id)

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex: number = items.indexOf(active.id);
        const newIndex: number = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    return props.handleDragEndGlobal(oldGlobalIndex, newGlobalIndex)
  }
  //DnDKit

  return (
    <div className="list-Root">
      <div className="list-Header">
        <button className="addGameBtn" onClick={addIndex}> Add Game</button>
        <button onClick={createList} className="createBtn">Create/Upload List</button>
        <input
          className="username"
          placeholder="Your username here"
          required
          onChange={event => props.setUsername(event.target.value)}
        ></input>
        <input
          className="title"
          placeholder="Title of your list here"
          required
          onChange={event => props.setListTitle(event.target.value)}
        ></input>
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
              <ListItem key={id} id={id} dltIndex={dltIndex} addGame={props.addGame}
                username={props.username} items={items} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
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
    const index = items[parseInt(id)];
    const length = items.length
    if (length <= 1) {
      console.log('Cannot remove anymore games')
      return
    } else {
      setItems(items.filter(item => item != id))
      props.dltGame(index)
    }
  }
}

export default List;
