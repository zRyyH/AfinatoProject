import React, { useContext } from 'react';
import { CalendarContext } from '../../contexts/calendarContext';
import { Tabs } from 'antd';

const items = [
    { label: 'Avaliação', key: 'Avaliação' },
    { label: 'Nutrição', key: 'Nutrição' },
    { label: 'Estética 1', key: 'Estética 1' },
    { label: 'Estética 2', key: 'Estética 2' },
    { label: 'Estética 3', key: 'Estética 3' },
    { label: 'Estética 4', key: 'Estética 4' }
];

const MyTabs = () => {
    const { setTypeCalendar } = useContext(CalendarContext);

    return (
        <Tabs defaultActiveKey="1" centered onChange={setTypeCalendar} items={items} tabPosition="bottom" />
    );
};

export default MyTabs;