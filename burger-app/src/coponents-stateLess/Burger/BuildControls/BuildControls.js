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
            <p>Aktualna cena: <strong>{props.price.toFixed(2)}</strong> zł.</p>
            {controls.map(ctrl => (
                <BuildControl 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                key={ctrl.label} 
                ingredientLabel={ctrl.label}
                disabled = {props.disabled[ctrl.type]}
                />
            ))}
            <button 
            onClick={props.ordered}
            className={classes.OrderButton} 
            disabled={!props.purchasable}>
                ODBIERZ ZAMÓWIENIE
            </button>
        </div>
    );
}
 
export default buildControls;