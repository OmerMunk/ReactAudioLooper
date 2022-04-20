import React, {useState} from "react";
import styles from './Container.module.css'

const Container = (props) => {


    return (
        <>
            <div className={styles[`${props.className}`]} style={props.width && {width: `${props.width}`}}>
                {props.children}
            </div>
        </>
    )
}

export default Container;