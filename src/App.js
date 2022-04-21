import Main from "./Components/UI/Main";


const App = () => {
    return (
        <>
            {/*Using inline-style for a one-time use element*/}
            <h1
                style={{textAlign: 'center', fontFamily: 'sans-serif', color: 'white'}}>
                <img src={process.env.PUBLIC_URL + 'moveo-logo-white.png'}
                     alt='Moveo Logo'
                     style={{marginRight: '-7px'}}/>
                oveo Media Player
            </h1>
            <Main/>
        </>
    );
}
export default App;
