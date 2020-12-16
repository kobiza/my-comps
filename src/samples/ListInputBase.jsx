import './ListInputBase.css'
import {useState} from 'react'
import ListInput from "../baseComponents/ListInput";

function ListInputBase() {
    const [items, setItems] = useState([])

    return (
        <ListInput items={items} setItems={setItems} placeholders={['ערך א', 'ערך ב', 'ערך ג']}/>
    );
}

export default ListInputBase;
