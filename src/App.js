import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import DashboardStudent from './components/pages/DashboardStudentPage'
import AddStudentCertificate from './components/pages/AddStudentCertificatePage'

import './App.css'

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ LandingPage } />
                    <Route path="/login" component={ LoginPage } />
                    {/* <Route path="/register" component={ RegisterPage } /> */}
                    <Route path="/forget-password" component={ ForgetPasswordPage } />
                    <Route path="/home-student" component={ DashboardStudent } />
                    <Route path="/add-certificate" component={ AddStudentCertificate } />
                </Switch>
                {/* <Footer /> */}
            </div>
        </Router>
    )
}

// const Footer = () => {
//     return (
//         <p className="footer text-center" style={ FooterStyle }>Designed & coded by ... </p>
//     )
// }

// const FooterStyle = {
//     background: "#252f30",
//     fontSize: ".8rem",
//     fontFamily: "Nunito",
//     color: "#fff",
//     // position: "absolute",
//     // bottom: 0,
//     padding: "1rem",
//     margin: 0,
//     width: "100%",
//     opacity: "1"
// }