import React, {useState, useEffect, useRef} from "react";
import Container from "../UI/Container";
import TimeBar from "./TimeBar";
import styles from './Channel.module.css';
import {FaVolumeMute} from "react-icons/fa"
import {FaVolumeUp} from "react-icons/fa"
import Button from "../UI/Button";
import SubChannel from "./SubChannel";

const MasterChannel = (props) => {
    const audio = new Audio(props.file)
    audio.load()
    audio.preload = 'metadata'


    const [currentPlayingTime, setCurrentPlayingTime] = useState(0)
    const [duration, setDuration] = useState(audio.duration)
    const [isMute, setIsMute] = useState(false)
    let isOn = props.isOn

    const timeBar = useRef();
    const audioPlayer = useRef();
    const animate = useRef();

    useEffect(() => {
        playing()
        setDuration(audioPlayer.current.duration)
        timeBar.current.step = 0.0001
        timeBar.current.max = audioPlayer.current.duration
    }, [isOn, audioPlayer?.current?.loadedMetadata])

    const playing = () => {
        if (isOn) {
            audioPlayer.current.play();
            animate.current = requestAnimationFrame(whilePlaying)
        }
        if (!isOn) {
            audioPlayer.current.pause()
            cancelAnimationFrame(animate.current)
        }
    }
    const whilePlaying = () => {
        timeBar.current.value = audioPlayer.current.currentTime;
        time2Handler()
        animate.current = requestAnimationFrame(whilePlaying)
    }
    const timeHandler = () => {
        audioPlayer.current.currentTime = timeBar.current.value;
        time2Handler()
    }
    const time2Handler = () => {
        timeBar.current.style.setProperty('--time_progress', `${((audioPlayer.current.currentTime / audioPlayer.current.duration) * 100).toString() + '%'}`)
        setCurrentPlayingTime(timeBar.current.value)
    }
    const muteHandler = () => {
        setIsMute(!isMute)
    }

    // const sub_channels = props.tracks.map(track => <SubChannel currentTime={currentPlayingTime} isOn={isOn} file={track}/>)


    return (
        <>
        <Container className={'channel'}>
            {isMute ? <Button onClick={muteHandler}><FaVolumeMute/> </Button> :
                <Button onClick={muteHandler}><FaVolumeUp/> </Button>}
            <audio preload='auto' loop={true} muted={isMute} ref={audioPlayer} src={props.mainSong}/>
            <div>current time: {currentPlayingTime}</div>
            <div>progress bar</div>
            <div><input className={styles.time_bar} type='range' defaultValue='0' ref={timeBar}
                        onChange={timeHandler}/></div>
            {duration > 0 ? <div> duration: {duration}</div> : <div> duration: 0</div>}
        </Container>
            <SubChannel currentTime={currentPlayingTime} isOn={isOn} file={props.tracks[0]} ref={audioPlayer}/>
            <SubChannel currentTime={currentPlayingTime} isOn={isOn} file={props.tracks[1]} ref={audioPlayer}/>
            <SubChannel currentTime={currentPlayingTime} isOn={isOn} file={props.tracks[2]} ref={audioPlayer}/>
            <SubChannel currentTime={currentPlayingTime} isOn={isOn} file={props.tracks[3]} ref={audioPlayer}/>
            <SubChannel currentTime={currentPlayingTime} isOn={isOn} file={props.tracks[4]} ref={audioPlayer}/>
            <SubChannel currentTime={currentPlayingTime} isOn={isOn} file={props.tracks[5]} ref={audioPlayer}/>
            <SubChannel currentTime={currentPlayingTime} isOn={isOn} file={props.tracks[6]} ref={audioPlayer}/>
            <SubChannel currentTime={currentPlayingTime} isOn={isOn} file={props.tracks[7]} ref={audioPlayer}/>
            {/*{sub_channels}*/}
        </>
    )
}
export default MasterChannel;