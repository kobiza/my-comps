import './App.css';
import {useState} from 'react'
import ListInput1 from "./ListInput1";

// const items = [
//   {id: 'item-1', value: 'אחד שתים שלוש'},
//   {id: 'item-2', value: 'ארבע חמש שש'},
//   {id: 'item-3', value: 'שבע שמונה תשע'},
// ]

function App() {
  const [items, setItems] = useState([])

  return (
    <div className="App">
      <ListInput1 items={items} setItems={setItems} placeholders={['ערך א', 'ערך ב', 'ערך ג']}/>
    </div>
  );
}

export default App;
