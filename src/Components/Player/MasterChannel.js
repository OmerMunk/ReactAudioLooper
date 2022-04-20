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

    const [isMute, setIsMute] = useState(false)
    const [isLoop, setIsLoop] = useState(false)
    let isOn = props.isOn
    let masterMute = props.isMute
    let masterLoop = props.isLoop
    let stop = props.stop
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
        timeBar.current.step = 0.01
        timeBar.current.max = audioPlayer1.current.duration
    }, [stop, masterLoop, masterMute, isOn, audioPlayer1?.current?.loadedMetadata])
    const playing = () => {
        if (isOn) {
            for (let player of players) {
                player.current.play()
            }
            animate.current = requestAnimationFrame(whilePlaying)
        } else if (!isOn) {
            for (let player of players) {
                player.current.pause()
            }
            cancelAnimationFrame(animate.current)
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
        if (stop) {
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
        timeBar.current.style.setProperty('--time_progress', `${((audioPlayer1.current.currentTime / audioPlayer1.current.duration) * 100).toString() + '%'}`)
        setCurrentPlayingTime(timeBar.current.value)
    }
    const muteHandler = () => {
        setIsMute(!isMute)
    }
    const volumeHandler = (event) => {
        audioPlayer1.current.volume = event.target.value
    }
    const drumPadDown = (event) => {
        if (event.key === '1') {
            audioPlayer2.current.currentTime = 0
            audioPlayer2.current.play()
        } else if (event.key === '2') {
            audioPlayer2.current.currentTime = 1.625
            audioPlayer2.current.play()

        } else if (event.key === '3') {
            audioPlayer2.current.currentTime = 2.15
            audioPlayer2.current.play()
        }
    }
    const drumPadUp = (event) => {
        if (event.key) {
            for (let player of players) {
                player.current.pause()
            }
        }
    }
    const subChannels = []
    for (let i = 0; i < 8; i++) {
        subChannels.push(
            <SubChannel currentTime={currentPlayingTime}
                        masterMute={masterMute}
                        masterLoop={masterLoop}
                        isOn={isOn}
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
                    <audio preload='auto' loop={isLoop} muted={isMute} ref={audioPlayer1} src={props.mainSong.file}/>
                    <div>
                        <div style={{
                            position: 'absolute',
                            zIndex: '3',
                            paddingLeft: '7px',
                            marginTop: '-20px',
                            fontFamily: 'sans-serif',
                            color: 'white',
                            fontWeight: '10',
                            '-webkit-user-select': 'none', '-webkit-touch-callout': 'none', userSelect: 'none'
                        }}>{props.mainSong.displayName.toString()}</div>
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
            <button onKeyPress={drumPadDown} onKeyUp={drumPadUp}>DRUM PAD</button>
        </>
    )
}
export default MasterChannel;