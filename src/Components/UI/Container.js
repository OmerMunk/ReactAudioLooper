//This is a custom 'Styled-Component' that represent a container.
// It is used everytime I need to "contain" component or element, like a custom div.

import React from "react";
import styles from './Container.module.css'

const Container = (props) => {
    return (
        <>

            <div
                // Unique class for every button made of this component
                className={styles[`${props.className}`]}
                // Conditional styling
                style={props.width && {width: `${props.width}`}}>
                {/*using 'props.children' to make sure everything in the content of the component will render in the button*/}
                {props.children}
            </div>
        </>
    )
}
export default Container;