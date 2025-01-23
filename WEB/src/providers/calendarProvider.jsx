import React, { useState } from 'react';

import { message } from "antd";

import { fetchAllConsultas } from '../api/services/consultaService';
import { fetchClientes } from '../api/services/clienteService';

import { CalendarContext } from '../contexts/calendarContext';

import CalendarPage from '../pages/calendar';



export default function CalendarProvider() {
    const [typeCalendar, setTypeCalendar] = useState('Avaliação');
    const [clients, setClients] = useState([]);
    const [querys, setQuerys] = useState([]);

    async function fetchQuerys(request) {
        const { data, success, error } = await request(fetchAllConsultas);

        if (success) {
            setQuerys(data.map(e => {
                return {
                    title: e.client,
                    start: new Date(e.dateStart),
                    end: new Date(e.dateEnd),
                    extendedProps: {
                        description: e.description,
                        type: e.type,
                        status: e.status,
                        queryId: e.queryId
                    }
                };
            }));
        } else {
            message.error(error);
        }
    };

    async function fetchClients(request) {
        const { data, success, error } = await request(fetchClientes);

        if (success) {
            setClients(data);
        } else if (clients.length === 0) {
            message.error(error);
        }
    };

    return (
        <CalendarContext.Provider value={{
            typeCalendar,
            setTypeCalendar,
            querys,
            fetchQuerys,
            fetchClients,
            clients
        }} >
            <CalendarPage />
        </CalendarContext.Provider>
    );
};