import React from 'react'
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
// import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import DashboardStudent from './components/pages/DashboardStudentPage'
import AddStudentCertificate from './components/pages/AddStudentCertificatePage'
import ViewStudentCertificates from './components/pages/ViewStudentCertificatesPage'
import StudentCertificatePaper from './components/pages/StudentCertificatePaperPage'
import DashboardSecretary from './components/pages/DashboardSecretaryPage'
import ListStudentCertificates from './components/pages/ListStudentCertificatesPage'
import ValidateCertificatePaper from './components/pages/ValidateCertificatePaperPage'
import PageNotFound from './components/pages/PageNotFound'

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
                <Route path="/home-student/:id" component={ DashboardStudent } />
                <Route path="/add-certificate/:id" component={ AddStudentCertificate } />
                <Route path="/view-certificates/:id" component={ ViewStudentCertificates } />
                <Route path="/student-certificate/:idAdv" component={ StudentCertificatePaper } />
                <Route path="/home-secretary/:id" component={ DashboardSecretary } />
                <Route path="/view-student-certificates/:id" component={ ListStudentCertificates } />
                <Route path="/validate-certificate/:id/:idAdv" component={ ValidateCertificatePaper } />
                <Route exact path="/page-not-found" component={ PageNotFound } />
                </Switch>
            </div>
        </Router>
    )
}
