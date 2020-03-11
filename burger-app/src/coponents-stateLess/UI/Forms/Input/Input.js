import React from 'react';
import classes from './Input.module.css';

const input = ( props ) => {

    let inputElement = null;

    switch ( props.elementType ) {
        case ('input'):
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />;
        break;
        case ('textarea'):
            inputElement = <textarea 
                className={classes.InputElement} 
                value={props.value}
                onChange={props.changed}        
                />;
        break;
        case ('select'):
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => {
                        return <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>;
                    })}
                </select>
            );
        break;
        case ('checkbox'):
            inputElement = (
                <label className={classes.CheckboxLabel} >
                    <input 
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    />
                    <span className={classes.Checkmark}></span> {props.children}
                </label>
            );
        break;
        case ('radio'):
            inputElement = (
                <label className={classes.InputElement}>
                    {props.children}
                    <br/>
                    {props.elementConfig.options.map(option => {
                        return (
                            <label htmlFor={option.value} key={option.value}>
                            <br/>
                            {option.text}
                            <input {...props.elementConfig} value={option.value} onChange={props.changed}/>
                            </label>
                        )
                    })}
                </label>
            );
        break;
        default:
                inputElement = <input 
                    className={classes.InputElement} 
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    />;
        break; 
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;