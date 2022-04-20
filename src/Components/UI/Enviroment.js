import React, {useEffect, useState} from "react";
import Button from "./Button";
import Container from "./Container";
import ChannelsList from "../Player/ChannelsList";
import Controls from "../Player/Controls";

const Enviroment = () => {

    const [isOn, setIsOn] = useState(false);

    const isOnSwitchHandler = () => {
        const prevValue = isOn;
        setIsOn(!prevValue);
    }

    const isOnUpdate = () => {
        return (
            isOn
        )
    }
    return (
        <>
            <Container className="center_column">
                <ChannelsList isOn={isOnUpdate()}/>
                <Controls setIsOn={isOnSwitchHandler}/>
            </Container>
        </>
    )
}

export default Enviroment;