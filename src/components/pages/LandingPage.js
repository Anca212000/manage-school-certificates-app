import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in';

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.png'
import HomePageLogo from '../../assets/images/circles-home.png'

export default function LandingPage() {
    return (
        <header className="intro-page" style={ HeaderStyle }>
            <div class="d-flex flex-lg-nowrap flex-md-wrap flex-sm-wrap flex-wrap align-items-center justify-content-center" style={{ maxWidth: '80%', margin: '0 auto'}}>
                <div>
                    <FadeIn>
                        <h1 className="main-title text-center">login</h1>
                        <p className="main-para text-center">Bine ai venit pe aceasta platforma unde poti crea orice adeverinta scolara!</p>
                        <div className="buttons text-center">
                            <Link to="/login">
                                <button className="primary-button" id="reg_btn"><span>Conecteaza-te </span></button>
                            </Link>
                            {/* <Link to="/register">
                                <button className="primary-button" id="reg_btn"><span>register </span></button>
                            </Link> */}
                        </div>
                    </FadeIn>
                </div>
                <div class="align-items-center justify-content-center">
                    <FadeIn>
                        <img src={HomePageLogo} class="home-img" width="auto" height="auto" alt="USV image" />
                    </FadeIn>
                </div>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    // height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}