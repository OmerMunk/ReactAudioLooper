import React, {useState, useEffect, useRef} from "react";
import Container from "../UI/Container";
import styles from './Channel.module.css';
import {FaVolumeMute} from "react-icons/fa"
import {FaVolumeUp} from "react-icons/fa"
import Button from "../UI/Button";

// This Component contains a sub-channel to the main channel.
// Except the local mute, everything that happens in that component is controlled from the parent / parents
// which makes it a kind of 'Controlled-Component'.

// Every component gets a unique ref from the parent
function SubChannel(props, ref) {
    const [isMute, setIsMute] = useState(false)

    const timeBar = useRef();
    useEffect(() => {
        playing()
    }, [props.masterMute, props.masterLoop])

    const playing = () => {
        if (props.isOn) {
            ref.current.play();
        } else if (!props.isOn) {
            ref.current.pause()
        }
        if (props.masterMute) {
            setIsMute(true)
        } else if (!props.masterMute) {
            setIsMute(false)
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
        <Container className='channel_controls'>
            <Button
                onClick={muteHandler}
                className={'mute'}
                style={isMute}>{isMute ? <FaVolumeMute/> : <FaVolumeUp/>}
            </Button>
            <input className={styles.volume}
                   type='range'
                   defaultValue='1'
                   min='0'
                   max='1'
                // 1% of volume change control
                   step='0.01'
                   onChange={volumeHandler}
            />
            <Container className={'channel'}>
                {/*A 'ref' is given to the audio html element, to control it from the parent*/}
                <audio preload='auto' loop={props.masterLoop} muted={isMute} ref={ref} src={props.file.file}/>
                    <div className={styles.text_div}>{props.file.displayName.toString()}</div>
                    <input className={styles.time_bar}
                           // conditional channel styling according to the mute state
                           style={{
                               background: isMute ? 'transparent' : props.color,
                               border: `3px solid ${props.border}`
                           }}
                           type='range'
                           defaultValue='0' ref={timeBar}
                           onChange={timeHandler}/>
            </Container>
        </Container>
    )
}

const forwardedSubChannel = React.forwardRef(SubChannel)
export default forwardedSubChannel;