import React, { useState } from 'react';
import classes from './Input.module.css';

const Input = ( props ) => {

    let validationMessage = null;
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    const checkboxClasses = [classes.CheckboxLabel];

    const [radioSelectedValue, setRadioSelectedValue] = useState(null);

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        checkboxClasses.push(classes.Invalid);
        if(props.validationHelp)
            validationMessage = (
                <p className={classes.ValidationHelp}>{props.validationHelp}</p>
            );
    }

    switch ( props.elementType ) {
        case ('input'):
            inputElement = ( <input 
                className={inputClasses.join(' ')}
                autoComplete="off"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            );
        break;
        case ('textarea'):
            inputElement = ( <textarea 
                className={inputClasses.join(' ')} 
                value={props.value}
                autoComplete="on"
                onChange={props.changed}        
                />
            );
        break;
        case ('password'):
            inputElement = ( <password 
                autoComplete="off"
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}        
                />
            );
        break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
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
                <label className={checkboxClasses.join(' ')} >
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
                            <div className={classes.Radio} key={option.value}>
                                <input className={classes.RadioInput}
                                    {...props.elementConfig}
                                    checked={radioSelectedValue === option.value}
                                    value={option.value} 
                                    onChange={props.changed}
                                    onClick={setRadioSelectedValue.bind(this,option.value)}
                                />
                                <label 
                                    className={classes.RadioLabel} 
                                    htmlFor={option.value} 
                                    value={option.value}
                                    onClick={setRadioSelectedValue.bind(this,option.value)}
                                >
                                    <span className={classes.RadioButton}></span>
                                    <span>&nbsp;</span>
                                    {option.text}
                                </label>
                            </div>
                        )
                    })}
                </label>
            );
        break;
        default:
                inputElement = ( <input 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig}
                    autoComplete="off"
                    value={props.value}
                    onChange={props.changed}
                    />
                );
        break; 
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationMessage}
        </div>
    );
}

export default Input;