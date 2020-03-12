import React from 'react';
import classes from './Input.module.css';

const input = ( props ) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />;
        break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                value={props.value}
                onChange={props.changed}        
                />;
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
                <label className={inputClasses.join(' ')} >
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
                <label className={inputClasses.join(' ')}>
                    {props.children}
                    <br/>
                    {props.elementConfig.options.map(option => {
                        return (
                            <table key={option.value}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input 
                                            {...props.elementConfig} 
                                            value={option.value} 
                                            onChange={props.changed}/>
                                        </td>
                                        <td>
                                            <label htmlFor={option.value} >
                                            {option.text}
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )
                    })}
                </label>
            );
        break;
        default:
                inputElement = <input 
                    className={inputClasses.join(' ')} 
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