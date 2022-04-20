import React, {useEffect, useState} from "react";
import MasterChannel from "./MasterChannel";
import Container from "../UI/Container";
import {musicFiles} from "../../Utils";
//TODO: maybe theme selector for each colors.

const ChannelsList = (props) => {
    let isOn = props.isOn

    const main_song = musicFiles[0];
    console.log(main_song)
    let tracks = musicFiles.filter(track=> track!== "ALL TRACK.mp3")
    console.log(tracks)

    // const channels = musicFiles.map(track => <MasterChannel currentPlayingTime={currentPlayingTime} setCurrentPlayingTime={currentPlayingTimeHandler} isOn={isOn} file={track}/>)
    return (
        <Container className='center_column'>
            <MasterChannel isOn={isOn} mainSong={main_song} tracks={tracks} />
            {/*{channels}*/}
        </Container>
    )
}
export default ChannelsList;