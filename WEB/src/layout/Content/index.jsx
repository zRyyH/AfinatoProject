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
                <p style={{ padding: '20px' }} >Minha Agenda</p>
                <AnimatedButton width={'175px'} text={'Adicionar consulta'} onClick={() => setVisible(true)} />
                <ButtonPDF title='Gerar PDF' />
            </div>

            <div className={styles.calendarContainer} >
                <div className={styles.tabsContainer} >
                    <Tabs />
                </div>
                <div className={styles.subCalendarContainer} >
                    <FullCalendar />
                </div>
            </div>

            <ModalConsulta visible={visible} setVisible={setVisible} />
        </div >
    )
};