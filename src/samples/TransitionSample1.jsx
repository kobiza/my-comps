import './TransitionSample1.css';
import {useState, useRef, useEffect} from 'react';
import classnames from 'classnames'
// import usePrevious from '../customHooks/usePrevious';

const isUndefined = (value) => typeof value === 'undefined'

function TransitionSample1() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [transitionFlags, setTransitionFlags] = useState({
        enter: -1,
        'enter-active': -1,
        exit: -1,
        'exit-active': -1,
    })
    // const prevIndex = usePrevious(currentIndex)
    // const prevIndexRef = useRef();
    // console.log('------ render ------')
    // useEffect(() => {
    //     console.log('------ useEffect ------')
    //     prevIndexRef.current = currentIndex;
    // });
    // const prevIndex = prevIndexRef.current;

    const items = [
        {bg: '#2ecc71', title: 'slide 1'},
        {bg: '#3498db', title: 'slide 2'},
        {bg: '#9b59b6', title: 'slide 3'},
        {bg: '#e67e22', title: 'slide 4'},
        {bg: '#f1c40f', title: 'slide 5'},
    ];

    const itemComps = items.map(({bg, title}, index) => {
        const isEnter = index === transitionFlags['enter'];
        const isExit = index === transitionFlags['exit'];
        const isEntering = index === transitionFlags['enter-active'];
        // const isExiting = index === transitionFlags['exit-active'];
        const isDone = currentIndex && !isEnter
        // const isBeforeEntering = currentIndex && isEnter && !isEntering
        const shouldShow = index === isDone || isEntering || isExit

        return (
            <div key={`item-${index}`} className={classnames({item: true, hide: !shouldShow, enter: isEnter, exit: isExit})} style={{backgroundColor: bg}}><h1>{title}</h1></div>
        )
    })

    const nextSlide = () => {
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        setCurrentIndex(nextIndex)
        setTransitionFlags({
            enter: nextIndex,
            exit: currentIndex,
            'enter-active': -1,
            'exit-active': -1,
        })
    }

    // if (!isUndefined(prevIndex) && prevIndex !== currentIndex) {
    //     startTransition({enterIndex: currentIndex, exitIndex: prevIndex})
    // }

    return (
        <div>
            {/*<h1>{`prev: ${prevIndex}, curr: ${currentIndex}`}</h1>*/}
            {/*<h1>{`flags: ${transitionFlags.enter}, ${transitionFlags.exit}, ${transitionFlags['enter-active']}, ${transitionFlags["exit-active"]}`}</h1>*/}
            <div className="items-container">
                {itemComps}
            </div>
            <input type="button" value="next" onClick={nextSlide}/>
        </div>

    );
}

export default TransitionSample1;
