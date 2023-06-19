import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import '../../App.css'

const styleIconInput = {
    fontSize: '.8rem', 
    backgroundColor: '#567aa3', 
    color: '#E8D5B5', 
    padding: '8px', 
    borderRadius: '20px'
}

export default function ForgetPasswordPage() {
    return (
        <div className="forget-pass-page text-center">
            <h2>Reseteaza parola</h2>
            <h5>Introdu adresa ta de email si iti vom trimite o noua parola</h5>
            <form action="/login">
                <p>
                    <label id="reset_pass_lbl"><FontAwesomeIcon icon={faEnvelope} style={styleIconInput} />&nbsp;Adresa de email</label><br/>
                    <input type="email" name="email" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Trimite parola de resetare</button>
                </p>
            </form>
            <footer>
                {/* <p>First time? <Link to="/register">Create an account</Link>.</p> */}
                <p><Link to="/"><FontAwesomeIcon icon={faHome} /> Inapoi la pagina principala</Link>.</p>
            </footer>
        </div>
    )
}
