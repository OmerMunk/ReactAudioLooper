import React, {useState, useEffect, useRef} from "react";
import Container from "../UI/Container";
import styles from './Channel.module.css';
import {FaVolumeMute} from "react-icons/fa"
import {FaVolumeUp} from "react-icons/fa"
import Button from "../UI/Button";
import SubChannel from "./SubChannel";
import {ChannelBackgroundColors} from "../UI/ColorsPalette";
import {ChannelBorderColors} from "../UI/ColorsPalette";

const MasterChannel = (props) => {

    const [currentPlayingTime, setCurrentPlayingTime] = useState(0)
    const [isMute, setIsMute] = useState(props.isMute)
    // const [isLoop, setIsLoop] = useState(false)
    // let isOn = props.isOn
    // let masterMute = props.isMute
    // let masterLoop = props.isLoop
    // let stop = props.stop
    const timeBar = useRef();
    const audioPlayer1 = useRef();
    const audioPlayer2 = useRef();
    const audioPlayer3 = useRef();
    const audioPlayer4 = useRef();
    const audioPlayer5 = useRef();
    const audioPlayer6 = useRef();
    const audioPlayer7 = useRef();
    const audioPlayer8 = useRef();
    const audioPlayer9 = useRef();
    const players = [audioPlayer1, audioPlayer2, audioPlayer3, audioPlayer4, audioPlayer5, audioPlayer6, audioPlayer7, audioPlayer8, audioPlayer9]
    const animate = useRef();
    useEffect(() => {
        playing()
        speedHandler()
        timeBar.current.step = 0.01
        timeBar.current.max = audioPlayer1.current.duration
    }, [props.speed, props.stop, props.isLoop, props.isMute, props.isOn, audioPlayer1?.current?.loadedMetadata])
    const playing = () => {
        if (props.isOn) {
            for (let player of players) {
                player.current.play()
            }
            animate.current = requestAnimationFrame(whilePlaying)
        } else if (!props.isOn) {
            for (let player of players) {
                player.current.pause()
            }
            cancelAnimationFrame(animate.current)
        }

        setIsMute(props.isMute)

        // if (masterMute  ) {
        //     setIsMute(true)
        // } else if (!masterMute ) {
        //     setIsMute(false)
        // }

        // if (props.isLoop) {
        //     setIsLoop(true)
        // } else if (!props.isLoop) {
        //     setIsLoop(false)
        // }
        if (props.stop) {
            for (let player of players) {
                player.current.load()
            }
        }
    }
    const whilePlaying = () => {
        timeBar.current.value = audioPlayer1.current.currentTime;
        time2Handler()
        animate.current = requestAnimationFrame(whilePlaying)
    }
    const timeHandler = () => {
        for (let player of players) {
            player.current.currentTime = timeBar.current.value;
        }

        time2Handler()
    }
    const time2Handler = () => {
        setCurrentPlayingTime(timeBar.current.value)
    }

    const speedHandler = () => {
        for (let player of players) {
            player.current.playbackRate = props.speed.value
        }
    }

    const muteHandler = () => {
        setIsMute(!isMute)
    }
    const volumeHandler = (event) => {
        audioPlayer1.current.volume = event.target.value
    }

    const subChannels = []
    for (let i = 0; i < 8; i++) {
        subChannels.push(
            <SubChannel currentTime={currentPlayingTime}
                        masterMute={props.isMute}
                        masterLoop={props.isLoop}
                        isOn={props.isOn}
                        file={props.tracks[i]}
                        ref={players[i + 1]}
                        color={ChannelBackgroundColors[i + 1]}
                        border={ChannelBorderColors[i + 1]}/>
        )
    }
    return (
        <>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                    onClick={muteHandler}
                    className={'mute'}
                    style={isMute}>{isMute ? <FaVolumeMute/> : <FaVolumeUp/>}</Button>
                <input className={styles.volume}
                       type='range'
                       defaultValue='1'
                       min='0'
                       max='1'
                       step='0.1'
                       onChange={volumeHandler}
                />
                <Container className={'channel'}>
                    {/*<audio preload='auto' loop={isLoop} muted={isMute} ref={audioPlayer1} src={props.mainSong.file}/>*/}
                    <audio preload='auto' loop={props.isLoop} muted={isMute} ref={audioPlayer1} src={'ALL TRACK.mp3'}/>
                    <div>
                        <div className={styles.text_div}>{props.mainSong.displayName.toString()}</div>
                        <input className={`${styles.time_bar} ${styles.main}`}
                               style={{
                                   backgroundColor: isMute ? 'transparent' : ChannelBackgroundColors[0],
                                   border: `3px solid ${ChannelBorderColors[0]}`
                               }}
                               type='range'
                               defaultValue='0'
                               ref={timeBar}
                               onChange={timeHandler}/></div>
                </Container>
            </div>
            {subChannels}
        </>
    )
}
export default MasterChannel;