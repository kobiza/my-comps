import './TransitionSample1.css';
import React from 'react';

const isUndefined = (value) => typeof value === 'undefined'



const UsePrevBug = () => {
    const [counter, setCounter] = React.useState(0)
    const [title, setTitle] = React.useState('Hi')

    const prevIndexRef = React.useRef();
    React.useEffect(() => {
        console.log('------ useEffect ------')
        prevIndexRef.current = counter;
    });
    const prevIndex = prevIndexRef.current;

    const increaseCounter = () => {
        setCounter(counter + 1)
    }

    if (!isUndefined(prevIndex) && prevIndex !== counter) {
        setTitle(`prev - ${prevIndex}, current - ${counter}` )
    }

    return (
        <div>
            <h1>{title}</h1>
            <h3>{`prev: ${prevIndex}, curr: ${counter}`}</h3>
            <input type="button" value="next" onClick={increaseCounter}/>
        </div>

    );
}

export default UsePrevBug;
