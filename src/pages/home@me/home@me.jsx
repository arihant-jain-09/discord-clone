import React from 'react'
import './home@me.scss'
const Home = () => {
    console.log('called');
    return (
        <>
        <div className="home">
                <img className="home__image" src="/./discord-background.jpg" alt="Discord background" />
        </div>
        </>
    )
}

export default Home
