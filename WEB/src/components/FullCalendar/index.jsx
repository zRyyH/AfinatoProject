import React, { useContext, useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import { CalendarContext } from "../../contexts/calendarContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { AppContext } from "../../contexts/appContext";
import ModalEdit from "../../components/ModalEdit"

import LoadingIndicator from '../LoadingIndicator'
import styles from './index.module.css';
import ModalConsulta from "../ModalConsulta";

import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
moment.locale("pt-br");


const messages = {
    allDay: "O dia todo",
    previous: "Anterior",
    next: "Próximo",
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Data",
    time: "Hora",
    event: "Consulta",
    noEventsInRange: "Nenhum evento neste período.",
    showMore: (total) => `+ mais ${total}`,
};


// Função para renderizar eventos na aba agenda
const renderAgendaEvent = (query, user) => {
    const { event, title } = query

    return (
        <div style={{ backgroundColor: '#f3f3f3', padding: '10px', borderRadius: '5px', color: 'black' }} >
            <strong>{title}</strong> {/* Título do evento */}
            <br />
            <span>Profissional: {user.name}</span> {/* Nome do cliente */}
            <br />
            <span>Descrição: {event.extendedProps.description}</span> {/* Descrição do evento */}
        </div>
    );
};


const MyCalendar = () => {
    const [event, setEvent] = useState(null);
    const [visible, setVisible] = useState(false);
    const [currentView, setCurrentView] = useState("month");
    const { user } = useContext(AppContext);
    const { querys, fetchQuerys, typeCalendar } = useContext(CalendarContext);
    const { loading, request } = useRequest();

    useEffect(() => {
        (async () => await fetchQuerys(request))()
    }, [typeCalendar])



    console.log(querys);

    return (
        <div className={styles.calendarContainer}>
            {
                loading ? <LoadingIndicator /> :
                    <Calendar
                        messages={messages}
                        localizer={localizer}
                        events={querys.filter(e => e.extendedProps.type === typeCalendar)}
                        onSelectEvent={(e) => (setEvent(e), setVisible(true))}
                        startAccessor="start"
                        endAccessor="end"
                        onView={(view) => setCurrentView(view)}
                        selectable
                        defaultView="month"
                        views={["month", "week", "day", "agenda"]}
                        components={{
                            agenda: {
                                event: (e) => renderAgendaEvent(e, user),
                            },
                        }}
                        eventPropGetter={(event) => {
                            if (currentView !== "agenda") {
                                let backgroundColor = 'white';
                                switch (event.extendedProps.status) {
                                    case 'Aberto':
                                        backgroundColor = 'rgb(13, 160, 0)';
                                        break

                                    case 'Cancelado':
                                        backgroundColor = 'rgb(156, 0, 0)';
                                        break

                                    case 'Atendido':
                                        backgroundColor = 'rgb(167, 150, 0)';
                                        break
                                }
                                return { style: { backgroundColor } };
                            }
                        }}
                    />
            }

            <ModalEdit setVisible={setVisible} visible={visible} query={event} />
        </div>
    );
};


export default MyCalendar;