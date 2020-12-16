import './ListInput.css'
import {useState, useRef, createRef, useMemo, useCallback} from 'react'

const s4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
const pipe = (allFns) => {
    const [fn,...fns] = allFns
    return (...args) => !fns.length ? fn(...args) : pipe(fns)(fn(...args))
};

const focusNextInput = (inputsRefs, index) => (e) => {
    if (e.keyCode === 13) {
        inputsRefs.current[index + 1].current.focus()
    }

    return e
}

const focusPrevOnLastDelete = (inputsRefs, index) => (e) => {
    if (e.keyCode === 8 && e.target.value === '') {
        inputsRefs.current[index - 1].current.focus()
    }

    return e
}

const ListInput = (props) => {
    const { placeholders, items, setItems } = props
    const [valuesToAdd, setValuesToAdd] = useState(['', '', ''])

    const itemsToRender = items.map(item => {
        const { value, id } = item

        return <li key={id}>{value}</li>
    })

    const setValue = index => e => {
        const newValuesToAdd = [
            ...valuesToAdd.slice(0, index),
            e.target.value,
            ...valuesToAdd.slice(index + 1, valuesToAdd.length),
        ]

        setValuesToAdd(newValuesToAdd)
    }

    const addOnEnter = useCallback(e => {
        if (e.keyCode === 13) {
            const id = `item-${s4}`
            setItems(items.concat([{id, value: valuesToAdd.join(' ')}]))
        }

        return e
    }, [items, setItems, valuesToAdd])

    const inputsRefs = useRef([]);

    if (inputsRefs.current.length !== placeholders.length) {
        // add or remove refs
        inputsRefs.current = Array(placeholders.length).fill().map((_, i) => inputsRefs.current[i] || createRef())
    }

    const onKeyDownCallbacks = useMemo(() => {
        return Array(placeholders.length).fill().map((placeholder, index) => {
            const onKeyDownCallbacks = []

            if (index === placeholders.length - 1) {
                onKeyDownCallbacks.push(addOnEnter)
            } else {
                onKeyDownCallbacks.push(focusNextInput(inputsRefs, index))
            }

            if (index !== 0) {
                onKeyDownCallbacks.push(focusPrevOnLastDelete(inputsRefs, index))
            }

            return pipe(onKeyDownCallbacks)
        })
    }, [ placeholders.length, addOnEnter ])

    const inputs = placeholders.map((placeholder, index) => {
        const onKeyDown = onKeyDownCallbacks[index]

        return (
            <input type="text" ref={inputsRefs.current[index]} key={index} placeholder={placeholders[index]} value={valuesToAdd[index]} onChange={setValue(index)} onKeyDown={onKeyDown}/>
        );
    })

    return(
        <div className="list-input">
            <div className="inputs">
                {inputs}
            </div>
            <ul className="list-input-list">
                {itemsToRender}
            </ul>
        </div>
    )
}

export default ListInput;
