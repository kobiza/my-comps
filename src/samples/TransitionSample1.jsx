import './TransitionSample1.css';
import {useState, useRef, useEffect} from 'react';
import classnames from 'classnames'

const ITEM_STATUSES = {
    idle: 'idle',
    show: 'show',
    beforeTransitionIn: 'beforeTransitionIn',
    onTransitionIn: 'onTransitionIn',
    beforeTransitionOut: 'beforeTransitionOut',
    onTransitionOut: 'onTransitionOut',
}

// const getClassesToApply = (nextItemsStatus, prevItemsStatus) => {
//     const allClasses
//
// }

function TransitionSample1() {
    const currentIndexRef = useRef(0)

    // 0 - current

    //nav to 1
    // ---
    // 0 - exit
    // 1 - enter
    // ---
    // 0 - exit exitActive
    // 1 - enter enterActive
    // ---
    // 0 -
    // 1 - current

    const items = [
        {bg: '#2ecc71', title: 'slide 1'},
        {bg: '#3498db', title: 'slide 2'},
        {bg: '#9b59b6', title: 'slide 3'},
        {bg: '#e67e22', title: 'slide 4'},
        {bg: '#f1c40f', title: 'slide 5'},
    ];

    const itemsStatus = [
        ITEM_STATUSES.show,
        ...Array(items.length - 1).fill(ITEM_STATUSES.idle)
    ]

    const itemsRefs = useRef({})
    const setRef = index => e => itemsRefs.current[index] = e

    const itemComps = items.map(({bg, title}, index) => {
        return (
            <div key={`item-${index}`} ref={setRef(index)} className={classnames({item: true})} style={{backgroundColor: bg}}><h1>{title}</h1></div>
        )
    })

    useEffect(() => {
        itemsRefs.current[0].classList.add("current");
    }, [])

    const forceReflow = (element) => {
        const scrollTop = element.scrollTop
    }

    const prepareTransition = ({enter, exit}) => {
        itemsRefs.current[exit].classList.add("exit");
        itemsRefs.current[enter].classList.add("enter");
    }

    const startTransition = ({enter, exit}) => {
        forceReflow(itemsRefs.current[exit])

        itemsRefs.current[exit].classList.add("exitActive");
        itemsRefs.current[enter].classList.add("enterActive");
    }

    const endTransition = ({enter, exit}) => {
        itemsRefs.current[exit].classList.remove("exit");
        itemsRefs.current[exit].classList.remove("exitActive");
        itemsRefs.current[exit].classList.remove("current");
        itemsRefs.current[enter].classList.remove("enter");
        itemsRefs.current[enter].classList.remove("enterActive");
        itemsRefs.current[enter].classList.add("current");
    }

    const next1 = () => {
        const exit = currentIndexRef.current
        const enter = currentIndexRef.current < items.length - 1 ? currentIndexRef.current + 1 : 0
        currentIndexRef.current = enter

        prepareTransition({enter, exit})
        startTransition({enter, exit})

        setTimeout(() => {
            endTransition({enter, exit})
        }, 3000)
    }

    return (
        <div>
            {/*<h1>{`prev: ${prevIndex}, curr: ${currentIndex}`}</h1>*/}
            {/*<h1>{`flags: ${transitionFlags.enter}, ${transitionFlags.exit}, ${transitionFlags['enterActive']}, ${transitionFlags["exitActive"]}`}</h1>*/}
            <div className="items-container">
                {itemComps}
            </div>
            <input type="button" value="next" onClick={next1}/>
        </div>

    );
}

export default TransitionSample1;
