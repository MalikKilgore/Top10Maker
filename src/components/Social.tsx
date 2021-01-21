import React, { useState } from 'react'
import '../css/Social.css';
import SearchResults from "./SearchResults";
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

function Social() {
    const [results, setResults] = useState([
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

    return (
        <div className="resultRoot">
            <div className="resultsContainer">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={results} strategy={verticalListSortingStrategy}>
                        {results.map((id) => (
                            <SearchResults key={id} id={id} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )
    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setResults((results) => {
                const oldIndex = results.indexOf(active.id);
                const newIndex = results.indexOf(over.id);

                return arrayMove(results, oldIndex, newIndex);
            });
        }
    }
}

export default Social;