import React, { useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import LoadingIndicator from '../LoadingIndicator'
import styles from './index.module.css';
import ModalConsulta from "../ModalConsulta";
import { CalendarContext } from "../../contexts/calendarContext";

import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useRequest from "../../hooks/useRequest";

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
    event: "Evento",
    noEventsInRange: "Nenhum evento neste período.",
    showMore: (total) => `+ mais ${total}`,
};


const MyCalendar = () => {
    const { querys, fetchQuerys, typeCalendar } = useContext(CalendarContext);
    const { loading, request } = useRequest();

    useEffect(() => {
        (async () => await fetchQuerys(request))()
    }, [typeCalendar])

    return (
        <div className={styles.calendarContainer}>
            {
                loading ? <LoadingIndicator /> :
                    <Calendar
                        messages={messages}
                        localizer={localizer}
                        events={querys}
                        startAccessor="start"
                        endAccessor="end"
                        selectable
                        defaultView="month"
                        views={["month", "week", "day", "agenda"]}
                    />
            }

            <ModalConsulta />
        </div>
    );
};


export default MyCalendar;