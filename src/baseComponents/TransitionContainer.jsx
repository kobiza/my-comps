import './TransitionContainer.css'

import {useRef, useEffect, Children, cloneElement} from 'react';
import classnames from 'classnames'

const isUndefined = (value) => typeof value === 'undefined'

function TransitionContainer({children, index, rootClassName, transitionDuration, onTransitionEnd}) {
    const itemsRefs = useRef({})
    useEffect(() => {
        itemsRefs.current[0].classList.add("current");
    }, [])

    const prevIndexRef = useRef();
    useEffect(() => {
        prevIndexRef.current = index;
    });
    const prevIndex = prevIndexRef.current;

    const forceReflow = (element) => {
        const scrollTop = element.scrollTop
    }

    const prepareTransition = ({enter, exit}) => {
        itemsRefs.current[exit].classList.add("exit");
        itemsRefs.current[enter].classList.add("enter");
    }

    const startTransition = ({enter, exit}) => {
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

    const transition = ({enter, exit}) => {
        prepareTransition({enter, exit})
        forceReflow(itemsRefs.current[exit])
        startTransition({enter, exit})

        setTimeout(() => {
            endTransition({enter, exit})
            onTransitionEnd()
        }, transitionDuration)
    }

    if (index !== prevIndex && !isUndefined(prevIndex)) {
        transition({enter: index, exit: prevIndex})
    }

    const setRef = index => e => itemsRefs.current[index] = e

    const renderChildren = () =>{
        return Children.map(children, (child, index) => {
            const className = classnames(
                child.props.className,
                'transition-item'
            );
            return cloneElement(child,{
                ref: setRef(index),
                className
            })
        })
    }

    return (
        <div className={classnames("transition-container", rootClassName)}>
            {renderChildren()}
        </div>
    );
}

export default TransitionContainer;
