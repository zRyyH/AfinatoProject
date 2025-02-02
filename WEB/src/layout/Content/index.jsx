import React, { useState } from "react";
import { Radio } from 'antd';
import styles from './index.module.css';
import FullCalendar from '../../components/FullCalendar';
import AnimatedButton from "../../components/Button";
import ModalConsulta from '../../components/ModalConsulta';
import Tabs from '../../components/Tabs';
import ButtonPDF from '../../components/GeneratePdf'


export default function Content() {
    const [periodo, setPeriodo] = useState(null);
    const [visible, setVisible] = useState(false);

    return (
        <div className={styles.master} >
            <div className={styles.taskContainer} >
                <p style={{ padding: '20px' }} >Minha Agenda</p>
                <AnimatedButton width={'185px'} text={'Adicionar consulta'} onClick={() => setVisible(true)} />
                <div className={styles.gerarPdfContainer} >
                    <ButtonPDF title='Gerar PDF' periodo={periodo} />
                    <Radio.Group
                        value={periodo}
                        onChange={(e) => setPeriodo(e.target.value)}
                        buttonStyle="solid"
                    >
                        <Radio.Button value={"MES"}>Mes</Radio.Button>
                        <Radio.Button value={"DIA"}>Dia</Radio.Button>
                    </Radio.Group>
                </div>
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