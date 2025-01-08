import React from 'react';
import { Button } from 'antd';

import Loader from '../LoadingIndicator';

import styles from './index.module.css';


const AnimatedButton = ({ width, text, type = 'primary', onClick, loading }) => {
    return (
        <Button
            type={type}
            className={styles.animatedButton}
            style={{ width: width }}
            onClick={onClick}>

            {loading ? <Loader /> : <>{text}</>}
            <span className={styles.animatedBg}></span>

        </Button>
    );
};


export default AnimatedButton;