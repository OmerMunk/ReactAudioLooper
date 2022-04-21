import React, {useState, useEffect, useRef} from "react";
import Container from "../UI/Container";
import styles from './Channel.module.css';
import {FaVolumeMute} from "react-icons/fa"
import {FaVolumeUp} from "react-icons/fa"
import Button from "../UI/Button";

function SubChannel(props, ref) {
    const [isMute, setIsMute] = useState(false)
    const [isLoop, setIsLoop] = useState(false)

    let isOn = props.isOn
    let masterMute = props.masterMute
    let masterLoop = props.masterLoop

    const timeBar = useRef();
    useEffect(() => {
        playing()
    }, [masterMute, masterLoop])

    const playing = () => {
        if (isOn) {
            ref.current.play();
        } else if (!isOn) {
            ref.current.pause()
        }
        if (masterMute) {
            setIsMute(true)
        } else if (!masterMute) {
            setIsMute(false)
        }
        if (masterLoop) {
            setIsLoop(true)
        } else if (!masterLoop) {
            setIsLoop(false)
        }
    }
    const timeHandler = () => {
        ref.current.currentTime = timeBar.current.value;
    }

    const muteHandler = () => {
        setIsMute(!isMute)
    }

    const volumeHandler = (event) => {
        ref.current.volume = event.target.value

    }
    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Button
                onClick={muteHandler}
                className={'mute'}
                style={isMute}
            >
                {isMute ? <FaVolumeMute/> : <FaVolumeUp/>}
            </Button>
            <input className={styles.volume}
                   type='range'
                   defaultValue='1'
                   min='0'
                   max='1'
                   step='0.1'
                   onChange={volumeHandler}
            />
            <Container className={'channel'}>

                <audio preload='auto' loop={isLoop} muted={isMute} ref={ref} src={props.file.file}/>
                <div style={{width: '100%'}}>
                    <div className={styles.text_div} >{props.file.displayName.toString()}</div>
                    <input className={styles.time_bar}
                           style={{
                               backgroundColor: isMute ? 'transparent' : props.color,
                               border: `3px solid ${props.border}`
                           }}
                           type='range'
                           defaultValue='0' ref={timeBar}
                           onChange={timeHandler}/></div>
            </Container>
        </div>
    )
}

const forwaredSubChannel = React.forwardRef(SubChannel)
export default forwaredSubChannel;