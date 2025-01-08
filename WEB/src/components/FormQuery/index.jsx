import React, { useContext } from "react";
import Data from '../../components/Data';
import Input from '../../components/Input';
import Selector from '../../components/Selector';
import { Form } from "antd";
import { CalendarContext } from "../../contexts/calendarContext";

export default function FormQuery({ setTitle, setClientId, setDateStart, setDateEnd }) {
    const { clients } = useContext(CalendarContext);

    function changeTitle(event) {
        setTitle(event.currentTarget.defaultValue);
    }

    function changeSelector(event) {
        setClientId(event);
    }

    function changeDataStart(event) {
        setDateStart(event.$d);
    }

    function changeDataEnd(event) {
        setDateEnd(event.$d);
    }

    return (
        <Form layout="vertical">
            <Input label='Descrição' onChange={changeTitle} />
            <Selector list={clients} label='Cliente' onChange={changeSelector} />
            <Data label='Data Inicio' onChange={changeDataStart} />
            <Data label='Data Término' onChange={changeDataEnd} />
        </Form>
    );
};