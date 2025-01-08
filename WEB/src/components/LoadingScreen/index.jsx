import React from "react";
import sytles from './index.module.css';

export default function LoadingScreen() {
    return (
        <div className={sytles.master} >
            <h1>Carregando...</h1>
        </div>
    )
}