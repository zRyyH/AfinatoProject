import React, { useContext } from 'react';
import { CalendarContext } from '../../contexts/calendarContext';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const MyTabs = () => {
    const { setTypeCalendar } = useContext(CalendarContext);

    return (
        <Tabs defaultActiveKey="1" centered onChange={setTypeCalendar}>
            <TabPane tab="Avaliação" key="Avaliação">
                {/* Conteúdo da aba Mês */}
            </TabPane>
            <TabPane tab="Nutrição" key="Nutrição">
                {/* Conteúdo da aba Semana */}
            </TabPane>
            <TabPane tab="Estética 1" key="Estética 1">
                {/* Conteúdo da aba Dia */}
            </TabPane>
            <TabPane tab="Estética 2" key="Estética 2">
                {/* Conteúdo da aba Agenda */}
            </TabPane>
        </Tabs>
    );
};

export default MyTabs;