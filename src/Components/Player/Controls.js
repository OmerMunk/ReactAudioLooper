import React from "react";
import Container from "../UI/Container";
import Button from "../UI/Button";
import {FaPause, FaPlay, FaStop, FaVolumeMute, FaVolumeUp} from "react-icons/fa"
import {TiArrowLoop} from "react-icons/ti"
import {CgPushRight} from "react-icons/cg"

// This Component holds the main buttons of the audio player controls.

const Controls = (props) => {
    const isOnSwitchHandler = () => {
        props.IsOnHandler()
        props.StopHandler(false)
    }
    const isMuteSwitchHandler = () => {
        props.IsMuteHandler()
    }
    const isLoopSwitchHandler = () => {
        props.IsLoopHandler()
    }
    const stopHandler = () => {
        props.StopHandler(true)
        if (props.isOn) {
            props.IsOnHandler(false)
        }
    }

    const speedHandler = () => {
        props.speedHandler()
    }
    return (

        // Conditioning button displays, according to certain states

        <Container className='center_row'>
            <Button className='mainButton' onClick={isOnSwitchHandler}>
                {props.isOn ? <FaPause/> : <FaPlay/>}
            </Button>
            <Button onClick={isMuteSwitchHandler}
                    className={'mainButton'}>{props.isMute ? <FaVolumeMute/> : <FaVolumeUp/>}</Button>
            <Button onClick={isLoopSwitchHandler}
                    className={'mainButton'}>{props.isLoop ? <TiArrowLoop/> : <CgPushRight/>}</Button>
            <Button onClick={stopHandler} className={'mainButton'}><FaStop/></Button>
            <Button className='mainButton' onClick={speedHandler}> {props.speed.value}x </Button>
        </Container>
    )
}
export default Controls;