import './TransitionSample1.css';
import {useState, useRef, useEffect} from 'react';
import classnames from 'classnames'


function TransitionSample1() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [transitionFlags, setTransitionFlags] = useState({
        enter: -1,
        'enterActive': -1,
        exit: -1,
        'exitActive': -1,
    })

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

    const itemsRefs = useRef({})
    const setRef = index => e => itemsRefs.current[index] = e

    const itemComps = items.map(({bg, title}, index) => {
        // const enter = index === transitionFlags.enter;
        // const exit = index === transitionFlags.exit;
        // const enterActive = index === transitionFlags.enterActive;
        // const exitActive = index === transitionFlags.exitActive;
        // // const isExiting = index === transitionFlags['exitActive'];
        // const isDone = index === currentIndex && !enter
        // // const isBeforeEntering = currentIndex && isEnter && !isEntering
        // const shouldShow = isDone || enterActive || exit

        return (
            <div key={`item-${index}`} ref={setRef(index)} className={classnames({item: true})} style={{backgroundColor: bg}}><h1>{title}</h1></div>
        )
    })

    useEffect(() => {
        itemsRefs.current[0].classList.add("current");
    }, [])

    const prevIndex = useRef(-1)
    useEffect(() => {
        if (prevIndex.current !== -1) {
            const prev = prevIndex.current
            setTimeout(() => {
                console.log(`prev ${prev} current ${currentIndex}`)
                itemsRefs.current[prev].classList.remove("exit");
                itemsRefs.current[prev].classList.remove("exitActive");
                itemsRefs.current[prev].classList.remove("current");
                itemsRefs.current[currentIndex].classList.remove("enter");
                itemsRefs.current[currentIndex].classList.remove("enterActive");
                itemsRefs.current[currentIndex].classList.add("current");
            }, 3000)
        }

        prevIndex.current = currentIndex
    }, [currentIndex])

    const nextSlide1 = () => {
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        setCurrentIndex(nextIndex)
        setTransitionFlags({
            enter: nextIndex,
            exit: currentIndex,
            enterActive: -1,
            exitActive: -1,
        })
    }

    const nextSlide2 = () => {
        setTransitionFlags({
            enter: transitionFlags.enter,
            exit: transitionFlags.exit,
            enterActive: transitionFlags.enter,
            exitActive: transitionFlags.exit,
        })
    }

    const end = () => {
        setTransitionFlags({
            enter: -1,
            exit: -1,
            enterActive: -1,
            exitActive: -1,
        })
    }

    const next1 = () => {
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        itemsRefs.current[currentIndex].classList.add("exit");
        itemsRefs.current[nextIndex].classList.add("enter");

        const scrollTop = itemsRefs.current[currentIndex].scrollTop
        itemsRefs.current[currentIndex].classList.add("exitActive");
        itemsRefs.current[nextIndex].classList.add("enterActive");

        setCurrentIndex(nextIndex)
        // setCurrentIndex(nextIndex) // should observe to currentIndex changed and only then start changing classes
        // setTransitionFlags({
        //     enter: -1,
        //     exit: -1,
        //     enterActive: -1,
        //     exitActive: -1,
        // })
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
