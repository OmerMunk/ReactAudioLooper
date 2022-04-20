import React, {useState, useEffect, useRef} from "react";
import Container from "../UI/Container";
import styles from './Channel.module.css';
import {FaVolumeMute} from "react-icons/fa"
import {FaVolumeUp} from "react-icons/fa"
import Button from "../UI/Button";

function SubChannel (props, ref){
    const audio = new Audio(props.file)
    audio.load()
    audio.preload = 'metadata'


    // const [currentPlayingTime, setCurrentPlayingTime] = useState(0)
    let currentPlayingTime = props.currentTime
    const setCurrentPlayingTime = (value) => {
        currentPlayingTime = value;
    }
    // const [duration, setDuration] = useState(audio.duration)
    const [isMute, setIsMute] = useState(props.isMute)
    let isOn = props.isOn

    const timeBar = useRef();
    const audioPlayer = useRef();
    const animate = useRef();

    useEffect(() => {
        playing()
        whilePlaying()
        // setCurrentPlayingTime(props.currentTime)
        timeBar.current.step = 0.0001
        timeBar.current.max = ref.current.duration
    }, [props.currentTime, isOn, ref?.current?.loadedMetadata])

    const playing = () => {
         if (isOn) {
            ref.current.play();
            animate.current = requestAnimationFrame(whilePlaying)
            // audioPlayer.current.currentTime = currentPlayingTime
        } else if (!isOn) {
            ref.current.pause()
            cancelAnimationFrame(animate.current)
        }
    }
    const whilePlaying = () => {
        timeBar.current.value = props.currentTime;
        time2Handler()
        animate.current = requestAnimationFrame(whilePlaying)
    }
    const timeHandler = () => {
        ref.current.currentTime = timeBar.current.value;
        time2Handler()
    }
    const time2Handler = () => {
        timeBar.current.style.setProperty('--time_progress', `${((ref.current.currentTime / ref.current.duration) * 100).toString() + '%'}`)
        // setCurrentPlayingTime(timeBar.current.value)
        setCurrentPlayingTime(timeBar.current.value)
    }
    const muteHandler = () => {
        setIsMute(!isMute)
    }
    return (
        <Container className={'channel'}>
            {isMute ? <Button onClick={muteHandler}><FaVolumeMute/> </Button> :
                <Button onClick={muteHandler}><FaVolumeUp/> </Button>}
            <audio preload='auto' loop={true} muted={isMute} ref={ref} src={props.file}/>
            <div>current time: {currentPlayingTime}</div>
            <div>progress bar</div>
            <div><input className={styles.time_bar} type='range' defaultValue='0' ref={timeBar}
                        onChange={timeHandler}/></div>
            {/*{duration > 0 ? <div> duration: {duration}</div> : <div> duration: 0</div>}*/}
        </Container>
    )
}

const forwaredSubChannel = React.forwardRef(SubChannel)

export default forwaredSubChannel;