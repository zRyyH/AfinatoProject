import { Radio } from 'antd';
import React, { useState, useContext } from "react";
import useRequest from "../../hooks/useRequest";
import { fetchEditConsulta, fetchDeleteConsulta } from '../../api/services/consultaService';
import { Modal } from "antd";
import { CalendarContext } from "../../contexts/calendarContext";
import LoadingIndicator from '../LoadingIndicator';


export default function ModalEdit({ visible, setVisible, query }) {
    const [status, setStatus] = useState(null);
    const { loading, request } = useRequest();
    const { fetchQuerys } = useContext(CalendarContext);

    async function ok() {
        const { queryId } = query.extendedProps
        console.log({ status, queryId })
        const { success } = await request(fetchEditConsulta, { status, queryId });
        if (success) await fetchQuerys(request);
        setVisible(false);
    }

    return (
        <Modal
            title="Editar Status"
            open={visible}
            onOk={ok}
            onCancel={() => setVisible(false)}
            okText="Salvar"
            cancelText="Cancelar"
            okButtonProps={{ disabled: loading }}
            cancelButtonProps={{ disabled: loading }}
        >
            {
                !loading ?
                    <Radio.Group
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        buttonStyle="solid"
                    >
                        <Radio.Button value="Aberto">Aberto</Radio.Button>
                        <Radio.Button value="Atendido">Atendido</Radio.Button>
                        <Radio.Button value="Cancelado">Cancelado</Radio.Button>
                    </Radio.Group>
                    :
                    <LoadingIndicator />
            }
        </Modal >
    );
};