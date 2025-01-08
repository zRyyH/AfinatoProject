import React from 'react';
import styles from './index.module.css';

const Loader = () => {
    return (
        <div style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
            <div className={styles.gradientSpinner}></div>
        </div>
    )
};

export default Loader;
