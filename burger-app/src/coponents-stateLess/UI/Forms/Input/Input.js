import React, { useState } from 'react';
import classes from './Input.module.css';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';

const Input = ( props ) => {

    let validationMessage = null;
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    const checkboxClasses = [classes.CheckboxLabel];

    const [radioSelectedValue, setRadioSelectedValue] = useState(false);

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
            inputElement = (
                <Auxiliary>
                    <input 
                        className={inputClasses.join(' ')}
                        id={props.id}
                        autoComplete={props.autocomplete}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                    <label htmlFor={props.id} className={classes.InputLabel}>{props.elementConfig.placeholder}</label>
                </Auxiliary>
        );
        break;
        case ('textarea'):
            inputElement = ( 
                <Auxiliary>
                    <textarea 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    autoComplete={props.autocomplete}
                    onChange={props.changed}        
                    />
                    <label htmlFor={props.id} className={classes.InputLabel}>{props.elementConfig.placeholder}</label>
                </Auxiliary>
            );
        break;
        case ('password'):
            inputElement = ( 
                <Auxiliary>
                    <password
                    autoComplete={props.autocomplete}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}        
                    />
                    <label htmlFor={props.id} className={classes.InputLabel}>{props.elementConfig.placeholder}</label>
                </Auxiliary>
            );
        break;
        case ('select'):
            inputElement = (
                <Auxiliary>
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
                    <label htmlFor={props.id} className={classes.InputLabel}>{props.elementConfig.placeholder}</label>
                </Auxiliary>
            );
        break;
        case ('checkbox'):
            const workArray = props.children.split("`");
            if(workArray.length === 3) {
                inputElement = (
                        <label className={checkboxClasses.join(' ')} >
                            <input 
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}
                            checked={radioSelectedValue}
                            />
                            <span
                                onClick={setRadioSelectedValue.bind(this,!radioSelectedValue)}
                                className={classes.Checkmark}
                            >
                            </span>
                            <span onClick={setRadioSelectedValue.bind(this,!radioSelectedValue)}
                                className={classes.CheckboxText}
                            > 
                                {workArray[0]}
                            </span>
                            <span 
                                className={[classes.CheckboxUseTerms, classes.CheckboxText].join(' ')}
                                onClick={props.displayRules}
                            > 
                                    {workArray[1]}
                            </span>
                            <span onClick={setRadioSelectedValue.bind(this,!radioSelectedValue)}
                                className={classes.CheckboxText}
                            > 
                                {workArray[2]} 
                            </span>
                        </label>
                );
            } else {
                inputElement = (
                    <label className={checkboxClasses.join(' ')} >
                        <input 
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                        checked={radioSelectedValue}
                        />
                        <span
                            onClick={setRadioSelectedValue.bind(this,!radioSelectedValue)}
                            className={classes.Checkmark}
                        >
                        </span> 
                        <p> 
                            <span onClick={setRadioSelectedValue.bind(this,!radioSelectedValue)}
                                className={classes.CheckboxText}
                            > 
                                {workArray[0]} 
                            </span>
                        </p>
                </label>
                );
            }
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
                    autoComplete={props.autocomplete}
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