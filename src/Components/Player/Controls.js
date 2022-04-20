import React, {useState} from "react";
import Container from "../UI/Container";
import Button from "../UI/Button";
import {FaPlay} from "react-icons/fa"
import {FaPause} from "react-icons/fa"
import {FaVolumeMute} from "react-icons/fa"
import styles from './Controls.module.css'

const Controls = (props) => {

    const [isOn, setIsOn] = useState(false);

    const isOnSwitchHandler = () =>{
        const prevValue = isOn;
        setIsOn(!prevValue);
        props.setIsOn()

    }

    return(
        <Container className='center_row'>
            <Button className='playOrPause' onClick={isOnSwitchHandler} >
                {isOn? <FaPause/> : <FaPlay/>}
            </Button>

        </Container>
    )
}

export default Controls;