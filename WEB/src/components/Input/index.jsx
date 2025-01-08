import { Form, Input } from "antd";

export default function InputComponent({ label, name, onChange, required = true, message = 'Sem menssagem', placeholder = 'Digite aqui...' }) {
    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{ required: required, message: message }]}
        >
            <Input placeholder={placeholder} onChange={onChange} />
        </Form.Item>
    )
}