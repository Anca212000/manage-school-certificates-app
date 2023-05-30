import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.png'

const styleIconInput = {
    fontSize: '.8rem', 
    backgroundColor: '#567aa3', 
    color: '#E8D5B5', 
    padding: '8px', 
    borderRadius: '20px'
}

export default function SignInPage() {
    return (
        <div>
            <FadeIn>
            <div className="login-page text-center m-5-auto">
                <h2>Conecteaza-te</h2>
                <form action="/home">
                    <p>
                        <label><FontAwesomeIcon icon={faUser} style={styleIconInput} />&nbsp;Nume de utilizator sau email</label><br/>
                        <input type="text" name="first_name" required />
                    </p>
                    <p>
                        <label><FontAwesomeIcon icon={faLock} style={styleIconInput} />&nbsp;Parola</label><br/>
                        <input type="password" name="password" required /><br/>
                        <Link to="/forget-password"><small className="right-label">Ai uitat parola?</small></Link>
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Login</button>
                    </p>
                </form>
                <footer>
                    {/* <p>First time? <Link to="/register">Create an account</Link>.</p> */}
                    <p><Link to="/"><FontAwesomeIcon icon={faHome} /> Inapoi la pagina principala</Link>.</p>
                </footer>
            </div>
            </FadeIn>
        </div>
    )
}
