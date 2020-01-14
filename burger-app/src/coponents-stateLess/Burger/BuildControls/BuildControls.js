import React from 'react';
 
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildComntrol';

const controls = [
    { label: 'Sałata', type: 'salad' },
    { label: 'Ser', type: 'cheese' },
    { label: 'Mięsko', type: 'meat' },
    { label: 'Bekon', type: 'bacon' }
];
 
const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(ctrl => (
                <BuildControl 
                added={() => props.ingredientAdded(ctrl.type)}
                key={ctrl.label} 
                ingredientLabel={ctrl.label}/>
            ))}
        </div>
    );
}
 
export default buildControls;