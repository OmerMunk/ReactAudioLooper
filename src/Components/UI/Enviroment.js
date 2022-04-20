import React, {useState} from "react";
import Container from "./Container";
import ChannelsList from "../Player/ChannelsList";
import Controls from "../Player/Controls";

const Enviroment = () => {
    const [isOn, setIsOn] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [stop, setStop] = useState(false)
    const isOnSwitchHandler = () => {
        setIsOn(!isOn);
    }
    const isMuteSwitchHandler = () => {
        setIsMute(!isMute);
    }
    const isLoopSwitchHandler = () => {
        setIsLoop(!isLoop);
    }
    const stopHandle = (value) => {
        setStop(value)
    }
    return (
        <>
            <Container className="center_column">

                <ChannelsList
                    isOn={isOn}
                    isMute={isMute}
                    isLoop={isLoop}
                    stop={stop}
                />
                <Controls
                    isOn={isOn}
                    isMute={isMute}
                    isLoop={isLoop}
                    IsOnHandler={isOnSwitchHandler}
                    IsMuteHandler={isMuteSwitchHandler}
                    IsLoopHandler={isLoopSwitchHandler}
                    StopHandler={stopHandle}
                />
            </Container>
        </>
    )
}
export default Enviroment;
