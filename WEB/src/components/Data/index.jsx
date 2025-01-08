import { DatePicker, Form } from "antd";

export default function Data({ onChange, label, name, width = '100%', message = 'Sem menssagem', required = true }) {
    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{ required: required, message: message }]}
        >
            <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                onChange={onChange}
                style={{ width: width }}
            />
        </Form.Item>
    )
}