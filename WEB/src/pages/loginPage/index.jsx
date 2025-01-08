import React from "react";
import styles from './index.module.css';
import logo from '../../midia/logo.png';
import LoginComponent from '../../components/Login';


export default function LoginPage() {
    return (
        <div className={styles.master} >
            <div className={styles.header} >
                <img src={logo} className={styles.logo} />
            </div>

            <div className={styles.bodyCenter} >
                <LoginComponent />
            </div>

            <div className={styles.baseboard} >
                <p>Todos direitos reservados.</p>
            </div>
        </div>
    );
};