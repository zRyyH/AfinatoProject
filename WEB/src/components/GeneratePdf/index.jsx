import React, { useContext } from 'react';
import AnimatedButton from '../Button';
import { message } from 'antd';
import { CalendarContext } from '../../contexts/calendarContext';
import { AppContext } from '../../contexts/appContext';
import { generatePdf } from '../../utils/generate-pdf';


const ButtonPDF = ({ title }) => {
    const { querys } = useContext(CalendarContext);
    const { user } = useContext(AppContext);

    function handleGenerate() {
        const linhas = querys.map(e => {
            const dataStart = new Date(e.start);
            const dataEnd = new Date(e.end);
            const title = e.title;
            const type = e.extendedProps.type;
            const profissional = user.name;
            
            const configData2 = { hour: '2-digit', minute: '2-digit', hour12: false };

            const start = dataStart.toLocaleTimeString('pt-BR', configData2);
            const end = dataEnd.toLocaleTimeString('pt-BR', configData2);

            if (dataStart.getDate() === new Date().getDate()) {
                const payload = [
                    `${start} as ${end}`,
                    title,
                    profissional,
                    type
                ]

                return payload
            } else {
                return []
            }
        }).filter(e => e.length > 0);

        if (generatePdf(linhas)) {
            message.success('PDF gerado com sucesso!');
        } else {
            message.error('Ocorreu um erro ao gerar o PDF.');
        }
    }

    return (
        <AnimatedButton width={'225px'} onClick={handleGenerate} text={title}></AnimatedButton>
    );
};

export default ButtonPDF;