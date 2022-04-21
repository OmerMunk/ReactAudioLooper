import React, {useState, useEffect, useRef} from "react";
import Container from "../UI/Container";
import styles from './Channel.module.css';
import {FaVolumeMute} from "react-icons/fa"
import {FaVolumeUp} from "react-icons/fa"
import Button from "../UI/Button";
import SubChannel from "./SubChannel";
// Importing modules that contain the color palettes.
import {ChannelBackgroundColors} from "../UI/ColorsPalette";
import {ChannelBorderColors} from "../UI/ColorsPalette";

// This component holds Main audio channel.
// Whatever happens here, especially in terms of current playing time, controls the Child-Components
// of the sub-channels

//The method I chose to use, is to create 9 references, each represent an audio controller for
// each one of the 9 channels.
// I chose to create and control them from here, the Parent Component,
// in order to control everything from one place.

// The variables, functions and their content, are named by their use and effect, for easier read.

const MasterChannel = (props) => {

    const [currentPlayingTime, setCurrentPlayingTime] = useState(0)

    //  Creating a 'isMute' state, although there is equivalent props, there is a difference.
    // The 'isMute' property from the Parent component, reference general mute.
    // This 'isMute', reference local channel mute.
    const [isMute, setIsMute] = useState(props.isMute)

    const timeBar = useRef();

    // Hard-coded definition of the 9 audio controllers.

    const audioPlayer1 = useRef();
    const audioPlayer2 = useRef();
    const audioPlayer3 = useRef();
    const audioPlayer4 = useRef();
    const audioPlayer5 = useRef();
    const audioPlayer6 = useRef();
    const audioPlayer7 = useRef();
    const audioPlayer8 = useRef();
    const audioPlayer9 = useRef();

    // 'Zipping' the controllers to an array, for easier control and readability.
    const players = [audioPlayer1, audioPlayer2, audioPlayer3, audioPlayer4, audioPlayer5, audioPlayer6, audioPlayer7, audioPlayer8, audioPlayer9]
    const animate = useRef();

    useEffect(() => {
        playing()
        speedHandler()
        timeBar.current.step = 0.01
        timeBar.current.max = audioPlayer1.current.duration
    }, [props.speed, props.stop, props.isLoop, props.isMute, props.isOn, audioPlayer1?.current?.loadedMetadata])

    // General function with some 'Listeners' that controls what is needed to happen while the
    // audio is played or controlled
    const playing = () => {
        if (props.isOn) {
            for (let player of players) {
                player.current.play()
            }
            // Animating the cursor
            animate.current = requestAnimationFrame(whilePlaying)
        } else if (!props.isOn) {
            for (let player of players) {
                player.current.pause()
            }
            cancelAnimationFrame(animate.current)
        }

        setIsMute(props.isMute)

        if (props.stop) {
            for (let player of players) {
                player.current.load()
            }
        }
    }

    // Controlling the cursor and the animation
    const whilePlaying = () => {
        timeBar.current.value = audioPlayer1.current.currentTime;
        timeStateHandler()
        animate.current = requestAnimationFrame(whilePlaying)
    }

    const timeHandler = () => {
        for (let player of players) {
            player.current.currentTime = timeBar.current.value;
        }
        timeStateHandler()
    }

    const timeStateHandler = () => {
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

    // Using a for loop to create the SubChannel Components.
    // Normally, I would use the 'map' JavaScript method to create similar components,
    // but I need to pass some customized variables such as numbers.
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
            <Container className='channel_controls'>
                <Button
                    onClick={muteHandler}
                    className={'mute'}
                    // Conditional mute button, according to the state
                    style={isMute}>{isMute ? <FaVolumeMute/> : <FaVolumeUp/>}</Button>
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
                    <audio preload='auto' loop={props.isLoop} muted={isMute} ref={audioPlayer1}
                           src={props.mainSong.file}/>
                    <div className={styles.text_div}>{props.mainSong.displayName.toString()}</div>
                    {/*This specific input, the differ from the other SubChannels, gets another class name which represents main channel */}
                    <input className={`${styles.time_bar} ${styles.main}`}
                        // conditional channel styling according to the mute state
                           style={{
                               background: isMute ? 'transparent' : ChannelBackgroundColors[0],
                               border: `3px solid ${ChannelBorderColors[0]}`
                           }}
                           type='range'
                           defaultValue='0'
                           ref={timeBar}
                           onChange={timeHandler}/>
                </Container>
            </Container>
            {subChannels}
        </>
    )
}
export default MasterChannel;