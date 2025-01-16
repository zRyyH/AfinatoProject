import { Select, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function SelectComponent({ list, label, name, onChange, message = 'Sem menssagem', required = true, width = '100%', bg = '#fff', color = '#fff', valueName = 'Nome', valueId = 'Row ID' }) {
    const style = { marginRight: "8px" }

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{ required: required, message: message }]}
        >
            <Select
                showSearch
                placeholder="Procurar"
                optionFilterProp="children"
                onChange={onChange}
                style={{ width: width }}
                dropdownStyle={{ backgroundColor: bg, color: color }}
            >
                {list.map(item => {
                    return (
                        <Option value={item[valueId]} key={item[valueId]} >
                            <UserOutlined style={style} />
                            {item[valueName]}
                        </Option>
                    )
                })}
            </Select>
        </Form.Item>
    )
}