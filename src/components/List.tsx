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
import plusCircle from '../assets/plus-circle-duotone.png'

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
              <ListItem key={id} id={id} dltIndex={dltIndex} addGame={props.addGame}
                username={props.username} items={items} />
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
