import { useState } from "react";
import images from "./assets/images";


const App = () => {

    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("todos")) || []);
    const [isEditing, setIsEditing] = useState(-1);

    const getValue = () => {
        if (inputValue.trim() === "") return;

        const newList = [...items, inputValue];
        setInputValue("");
        setToStorage(newList);
    }


    //   delete items 

    const deletValue = (index) => {
        const newList= [...items];
        newList.splice(index, 1)
        setToStorage(newList);

    };

    // edit Value 
    const handleEdit = (index) => {
        const todo = items[index];
        setInputValue(todo);
        setIsEditing(index);
    }

    const update = () => {
        if (inputValue.trim() === "") return;

        const newList = [...items];
        newList[isEditing] = inputValue;

        setToStorage(newList);
        cancelAll();
    }

    const cancelAll = () => {
        setInputValue("");
        setIsEditing(-1);
    }

    
    const setToStorage = (list) => {
        setItems(list);
        localStorage.setItem("todos", JSON.stringify(list));
    }
    


    return (
        <div className="container">
            <div className="heading">
                <h1>ToDo List</h1>
            </div>
            <div className="line">
                <hr />
            </div>
            <div className="textfield">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add an item"
                />
                <button onClick={() => isEditing !== -1 ? update() : getValue()}>{isEditing !== -1 ? "Update" : "Add ➕"}</button>
                {isEditing !== -1 && <button onClick={cancelAll}>Cancel</button>}
            </div>

            <div className="list">

                {items.map((item, index) => (
                    <div key={index} className="todoTile">
                        {item}
                        <div className="todoActions">
                            <div className="tooltip">
                                <img src={images.del} alt="delete" onClick={() => deletValue(index)} />
                                <span className="tooltiptext">Delete</span>
                            </div>

                            <div className="tooltip">
                                <img src={images.edi} alt="edit" onClick={() => handleEdit(index)} />
                                <span className="tooltiptext">Edit</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default App;