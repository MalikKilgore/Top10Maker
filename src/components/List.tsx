import React, { useState } from 'react';

function List() {
    const [game, setGame] = useState([
        {
            //React hook
        },
    ]);

    return (
        <div className="listRoot">
            <p>
                Edit <code>src/components/List.tsx</code> and save to reload.
            <br></br>
            Just like this. Nerds. React ez
            </p>
        </div>
    );
}

export default List;