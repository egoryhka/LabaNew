import myRequest from "@/utils/request";
import { history } from "@umijs/max";
import { Button, Form, Input, Space } from "antd";

export default () => {
    const createHandler = (data: any) => {
        myRequest(`/Position`, { method: 'PUT', data }).then(res => {
            history.push('/position');
        });
    };

    return (
        <>
            <Form onFinish={createHandler} autoComplete="off">
                <Form.Item name="name" label="Название" rules={[{ required: true }]} >
                    <Input placeholder="Название..."/>
                </Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">Создать</Button>
                    <Button type="primary" danger={true} onClick={() => history.back()}>Отмена</Button>
                </Space>
            </Form>
        </>
    );
};
