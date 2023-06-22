import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'
import FadeIn from 'react-fade-in';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignInPage() {
    // const navigate = useHistory();
    const [email, setEmail] = React.useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const [messAlert, setMessAlert] = React.useState('');

    const getLoginDataByEmail = (email) => {
        fetch(`http://localhost:8080/users?email=${email}`, { method: "GET"})
            .then((response) => response.json())
            .then((result) => {
                // console.log(result)
                if (result.length === 0) {
                    setOpenAlert(true)
                    setMessAlert("Emailul este gresit! Mai incearca!")
                }
                else if (result[0].rol === "student") {
                    window.location.replace("/home-student/" + result[0].id);
                }
                else if (result[0].rol === "secretar" || result[0].rol === "secretarSef" || result[0].rol === "decan") {
                    window.location.replace("/home-secretary/" + result[0].id);
                }
            })
            .catch((error) => {
                console.log("error", error)
                setOpenAlert(true)
                setMessAlert(error)
            });
    };

    // useEffect(() => {
    //     getLoginData();
    // }, []);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
        setMessAlert('');
      };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        if (!/@student.usv.ro$/.test(email) && !/@usm.ro$/.test(email)) {
            setOpenAlert(true);
            setMessAlert('Acest email nu este valid! Platforma se acceseaza doar cu emailul facultatii!');
        }
        else {
            getLoginDataByEmail(email);
        }
    };

    const vertical = 'top';
    const horizontal = 'center';
    const alertBox = (
        <Snackbar 
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
            open={openAlert} 
            autoHideDuration={8000} 
            onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                {messAlert}
            </Alert>
        </Snackbar>
    );

    return (
        <FadeIn>
        <div className="login-page text-center">
            {alertBox}
            <h2>Conecteaza-te</h2>
            <form className="reg-form" onSubmit={handleSubmit}>
                <p>
                    <label><FontAwesomeIcon icon={faUser} style={styleIconInput} />&nbsp;Introdu email-ul tau</label><br/>
                    <input type="email" name="first_name" autoComplete='off' value={email} onChange= {(e) => setEmail(e.target.value)} required />
                </p>
                {/* <p>
                    <label><FontAwesomeIcon icon={faLock} style={styleIconInput} />&nbsp;Parola</label><br/>
                    <input type="password" name="password" required /><br/>
                    <Link to="/forget-password"><small className="right-label">Ai uitat parola?</small></Link>
                </p> */}
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
    )
}
