import React, { useState } from "react";
import styles from './index.module.css';
import FullCalendar from '../../components/FullCalendar';
import AnimatedButton from "../../components/Button";
import ModalConsulta from '../../components/ModalConsulta';
import Tabs from '../../components/Tabs';
import ButtonPDF from '../../components/GeneratePdf'


export default function Content() {
    const [visible, setVisible] = useState(false);

    return (
        <div className={styles.master} >
            <div className={styles.taskContainer} >
                <p style={{ paddingBottom: '25px' }} >Minha Agenda</p>
                <AnimatedButton width={'225px'} text={'Adicionar Agendamento'} onClick={() => setVisible(true)} />
                <ButtonPDF title='Gerar PDF de consultas' />
            </div>

            <Tabs />
            <FullCalendar />

            <ModalConsulta visible={visible} setVisible={setVisible} />
        </div >
    )
};