import React from "react";
import styles from './Button.module.css'


//This is a custom 'Styled Component' that represent a button.

const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            // Unique class for every button made of this component
            className={styles[`${props.className}`]}
            // Conditional styling for transparent background
            style={{backgroundColor: props.style === true ? 'transparent' : '#c71c2a'}}
        >
            {/*using 'props.children' to make sure everything in the content of the component will render in the button*/}
            {props.children}
        </button>
    )
}

export default Button;