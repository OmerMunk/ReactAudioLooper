import React from "react";
import MasterChannel from "./MasterChannel";
import Container from "../UI/Container";
import {musicFiles} from "../../Utils";

const ChannelsList = (props) => {
    let isOn = props.isOn
    let isMute = props.isMute
    let isLoop = props.isLoop
    let stop = props.stop
    const main_song = musicFiles[0];
    let tracks = musicFiles.filter(track => track.file !== "ALL TRACK.mp3")
    return (
        <Container className='center_column'>
            <MasterChannel
                isOn={isOn}
                isMute={isMute}
                isLoop={isLoop}
                stop={stop}
                mainSong={main_song}
                tracks={tracks}/>
        </Container>
    )
}
export default ChannelsList;