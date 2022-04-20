import React from "react";
import styles from './Button.module.css'

const Button = (props) => {

    return (
        <button
            onClick={props.onClick}
            className={styles[`${props.className}`]}
            style={{backgroundColor: props.style === true ? 'transparent' : '#c71c2a'}}
        >
            {props.children}
        </button>
    )
}

export default Button;