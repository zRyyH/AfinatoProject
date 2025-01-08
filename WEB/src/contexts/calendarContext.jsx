import { createContext } from 'react';
export const CalendarContext = createContext({
    typeCalendar: null,
    setTypeCalendar: null,
    querys: [],
    fetchQuerys: null,
    fetchClients: null,
    clients: []
});