import Main from "./Components/UI/Main";


const App = () => {
    console.log('render app')

    return (
        <>
            <h1 style={{textAlign: 'center', fontFamily: 'sans-serif', color: 'white'}}><img src={process.env.PUBLIC_URL + 'moveo-logo-white.png'}  alt='moveo logo' style={{marginRight:'-7px'}}/> oveo Media Player</h1>
            <Main/>
        </>
    );
}
export default App;
