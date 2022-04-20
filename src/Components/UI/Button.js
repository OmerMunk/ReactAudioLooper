import React, {useState} from "react";
import styles from './Button.module.css'

const Button = (props) => {

    return(
        <button onClick={props.onClick} className={styles[`${props.className}`]}>{props.children}</button>
    )
}

export default Button;