import './TransitionSample2.css';
import {useState} from 'react';
import classnames from 'classnames'
import TransitionContainer from '../baseComponents/TransitionContainer'

function TransitionSample1() {
    const [index, setIndex] = useState(0)

    const items = [
        {bg: '#2ecc71', title: 'slide 1'},
        {bg: '#3498db', title: 'slide 2'},
        {bg: '#9b59b6', title: 'slide 3'},
        {bg: '#e67e22', title: 'slide 4'},
        {bg: '#f1c40f', title: 'slide 5'},
    ];

    const itemComps = items.map(({bg, title}, index) => {
        return (
            <div key={`item-${index}`} className="item" style={{backgroundColor: bg}}><h1>{title}</h1></div>
        )
    })

    const next1 = () => {
        setIndex(index < items.length - 1 ? index + 1 : 0)
    }

    return (
        <div>
            <TransitionContainer index={index} rootClassName="items-container" transitionDuration={3000}>
                {itemComps}
            </TransitionContainer>
            <input type="button" value="next" onClick={next1}/>
        </div>

    );
}

export default TransitionSample1;
