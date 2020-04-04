import React from 'react';
import PropTypes from 'prop-types';
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
                disabled={!props.purchasable}
            >
                {props.isAuth ? 'ODBIERZ ZAMÓWIENIE' : 'ZAREJESTRÓJ SIĘ ŻEBY ZAMAWIAĆ'}
            </button>
        </div>
    );
}

buildControls.propTypes = {
    price: PropTypes.number.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    ordered: PropTypes.func.isRequired,
    disabled: PropTypes.object.isRequired
}
 
export default buildControls;