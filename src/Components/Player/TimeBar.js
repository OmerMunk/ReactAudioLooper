import React, {useEffect, useState} from "react";
import Container from "../UI/Container";


const TimeBar = (props) => {

    const [time, setTime] = useState(props.time)
    const [ticker, setTicker] = useState(null)


    let timeFillWidth = time.toString() + '%'

    if (props.time > 0) {
        timeFillWidth = ((props.time / props.duration) * 100).toString() + '%'
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTicker(Math.random())
    //         console.log(time)
    //     }, 1000)
    //     return () => clearInterval(interval)
    // },[])


    return (
        <Container className={'time_bar'} width={timeFillWidth}>
        </Container>
    )
}

export default TimeBar