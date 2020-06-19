import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildComntrol';
import { controlsPolish } from '../../../polish-translations';
 
const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Aktualna cena: <strong>{props.price.toFixed(2)}</strong> zł.</p>
            {controlsPolish.map(ctrl => (
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