import React, { useState, useContext } from "react";
import useRequest from "../../hooks/useRequest";
import { fetchCreateConsulta } from '../../api/services/consultaService';
import { message, Modal } from "antd";
import { CalendarContext } from "../../contexts/calendarContext";
import LoadingIndicator from '../LoadingIndicator';
import FormQuery from '../FormQuery';

export default function ModalConsulta({ visible, setVisible }) {
    const { loading, request } = useRequest();

    const { typeCalendar, clients, fetchQuerys } = useContext(CalendarContext);

    const [clientId, setClientId] = useState('');
    const [description, setDescription] = useState('');
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

    async function ok() {
        const payload = {
            clientId,
            client: clients.filter(e => e['Row ID'] === clientId)[0].Nome,
            description,
            dateStart,
            dateEnd,
            status: "Aberto",
            type: typeCalendar
        }

        const { success, error } = await request(fetchCreateConsulta, payload);

        if (success) {
            message.success('Consulta agendada com sucesso!');
            await fetchQuerys(request);
        } else {
            message.error(error);
        }

        setVisible(false);
    }

    return (
        <Modal
            title="Criar Agendamento"
            open={visible}
            onOk={ok}
            onCancel={() => setVisible(false)}
            okText="Confirmar"
            cancelText="Cancelar"
            okButtonProps={{ disabled: loading }}
            cancelButtonProps={{ disabled: loading }}
        >
            {
                !loading ?
                    <FormQuery
                        clientes={clients}
                        setClientId={setClientId}
                        setDateEnd={setDateEnd}
                        setDateStart={setDateStart}
                        setTitle={setDescription} />
                    :
                    <LoadingIndicator />
            }
        </Modal>
    );
};