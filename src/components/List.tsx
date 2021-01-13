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
} from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
//import axios from 'axios'

function List() {
  const [items, setItems] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "unique-id",
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  /*function postRequest(){
    return axios.post('https://id.twitch.tv/oauth2/token?client_id=4a1ri5yfip3ikw2rxmpgqjmu51nok7&client_secret=q8306grers4h9uxsv9xtauknh2mx3e&grant_type=client_credentials')
    .then(function(results){
      console.log(results)
    })
  } 
  
  onClick={postRequest} */
  return (
    <div className="list-Root">
      <div className="list-Header">
        <button>Axios Twitch POST request</button>
      </div>
      <div className="list-Main">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id) => (
              <ListItem key={id} id={id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className="list-Footer"></div>
    </div>
  );
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export default List;
