import React, {useState} from "react";
import Container from "./Container";
import ChannelsList from "../Player/ChannelsList";
import Controls from "../Player/Controls";

const Main = () => {

    const speed_values = [
        {
            index: 0,
            value: 0.5
        },
        {
            index: 1,
            value: 1.0
        },
        {
            index: 2,
            value: 2.0
        }
    ]

    const [isOn, setIsOn] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [stop, setStop] = useState(false)
    const [speed, setSpeed] = useState(speed_values[1])
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

    const speedHandler = () => {
        setSpeed(speed_values[(speed.index+1)%3])
    }
    return (
        <>
            <Container className="center_column">
                <ChannelsList
                    isOn={isOn}
                    isMute={isMute}
                    isLoop={isLoop}
                    stop={stop}
                    speed={speed}
                />
                <Controls
                    isOn={isOn}
                    isMute={isMute}
                    isLoop={isLoop}
                    IsOnHandler={isOnSwitchHandler}
                    IsMuteHandler={isMuteSwitchHandler}
                    IsLoopHandler={isLoopSwitchHandler}
                    StopHandler={stopHandle}
                    speedHandler = {speedHandler}
                    speed={speed}
                />
            </Container>
        </>
    )
}
export default Main;
