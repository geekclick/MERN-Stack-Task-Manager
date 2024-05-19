import { useState, useEffect } from "react";
import axios from "axios";

type Item = {
  _id: string;
  text: string;
};

function App() {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:5000/api/items");
    setItems(response.data);
  };

  const handleAddItem = async () => {
    await axios.post("http://localhost:5000/api/items", { text: newItemText });
    setNewItemText("");
    fetchItems();
  };

  return (
    <div>
      <h1>Vite React + Node.js + Express + MongoDB</h1>
      <ul>
        {items.map((item: Item) => (
          <li key={item._id}>{item.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
