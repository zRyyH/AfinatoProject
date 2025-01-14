import React from "react";
import { Modal } from "antd";

export default function ModalConsulta({ title, visible, setVisible, callback = () => { }, okText = 'Confirmar', cancelText = 'Cancelar' }) {
    return (
        <Modal
            title={title}
            open={visible}
            onOk={() => { setVisible(false), callback() }}
            onCancel={() => setVisible(false)}
            okText={okText}
            cancelText={cancelText}
        >
        </Modal>
    );
};