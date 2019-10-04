import React from 'react'
import styles from './Input.module.css'


const input =(props) => {

    let inputElement = null;
    const inputStyles = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched ){
        inputStyles.push(styles.Invalid)
    }

    let validationError = null; 
    if (props.invalid && props.touched) {
        validationError = <p className={styles.ValidationError}>Please enter a valid value</p>
    }

    switch (props.elementType) {
        case ('input'): 
        inputElement = 
            <input 
                onChange={props.changed}
                className={inputStyles.join(' ')} {...props.elementConfig} 
                value={props.value}
                />
        break;
     case ('textarea'):
         inputElement = 
            <textarea 
                onChange={props.changed}
                className={inputStyles.join(' ')}
                {...props.elementConfig} 
                value={props.value}/>
         break;
    case ('select'):
        inputElement = (
            <select 
                onChange={props.changed}
                className={inputStyles.join(' ')}
                value = {props.value}> 
                { props.elementConfig.options.map(
                    option => (
                        <option key={option.value} value={option.value} >{option.displayValue}</option>
                    )
                )}
            </select>)
        break;
    default: 
        inputElement = <input className={inputStyles.join(' ')} {...props.elementConfig} value={props.value}/>
    }
     
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input