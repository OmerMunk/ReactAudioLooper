import React from "react";
import MasterChannel from "./MasterChannel";
import Container from "../UI/Container";
import {musicFiles} from "../../Utils";

const ChannelsList = (props) => {
    console.log('render channel list')
    const main_song = musicFiles[0];
    let tracks = musicFiles.filter(track => track.file !== "ALL TRACK.mp3")
    return (
        <Container className='center_column'>
            <MasterChannel
                isOn={props.isOn}
                isMute={props.isMute}
                isLoop={props.isLoop}
                stop={props.stop}
                speed={props.speed}
                mainSong={main_song}
                tracks={tracks}/>
        </Container>
    )
}
export default ChannelsList;