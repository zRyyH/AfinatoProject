import React from "react";
import styles from './index.module.css'
import logoAuth from '../../midia/logoAuth.png'

export default function Logo({ height }) {
    return (
        <div className={styles.master} style={{ height: height }} >
            <img src={logoAuth} className={styles.logo} alt="Logo" />
        </div>
    )
}