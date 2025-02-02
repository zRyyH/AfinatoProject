import React, { useContext } from 'react';
import AnimatedButton from '../Button';
import { message } from 'antd';
import { CalendarContext } from '../../contexts/calendarContext';
import { AppContext } from '../../contexts/appContext';
import { generatePdf } from '../../utils/generate-pdf';


const ButtonPDF = ({ title, periodo }) => {
    const { querys } = useContext(CalendarContext);
    const { user } = useContext(AppContext);

    function formatarData(data) {
        // Extrair componentes
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
        const ano = data.getFullYear();

        // Formatar para 00:00
        const horas = '00';
        const minutos = '00';

        // Montar string final
        const dataFormatada = `${dia}/${mes}/${ano} ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false })}`;

        return dataFormatada;
    }

    function handleGenerate() {
        const linhas = querys.map(e => {
            const dataStart = new Date(e.start);
            const dataEnd = new Date(e.end);
            const title = e.title;
            const type = e.extendedProps.type;
            const status = e.extendedProps.status;
            const profissional = user.name;

            const configData2 = { hour: '2-digit', minute: '2-digit', hour12: false };

            const start = dataStart.toLocaleTimeString('pt-BR', configData2);
            const end = dataEnd.toLocaleTimeString('pt-BR', configData2);

            if (periodo === 'DIA') {
                const isPeriodo = dataStart.getDate() === new Date().getDate()

                if (isPeriodo) {
                    const payload = [
                        `${formatarData(dataStart)} - ${formatarData(dataEnd)}`,
                        title,
                        profissional,
                        type,
                        status
                    ]

                    return payload
                } else {
                    return []
                }

            } else {
                const isPeriodo = dataStart.getMonth() === new Date().getMonth()

                if (isPeriodo) {
                    const payload = [
                        `${formatarData(dataStart)} - ${end}`,
                        title,
                        profissional,
                        type,
                        status
                    ]

                    return payload
                } else {
                    return []
                }
            }

        }).filter(e => e.length > 0).sort((a, b) => {
            return a[0].localeCompare(b[0]);
        });

        console.log(linhas);

        if (generatePdf(linhas)) {
            message.success('PDF gerado com sucesso!');
        } else {
            message.error('Ocorreu um erro ao gerar o PDF.');
        }
    }

    return (
        <AnimatedButton width={'185px'} onClick={handleGenerate} text={title}></AnimatedButton>
    );
};

export default ButtonPDF;