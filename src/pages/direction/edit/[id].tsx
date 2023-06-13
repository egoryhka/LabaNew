import myRequest from "@/utils/request";
import { history, useParams } from "@umijs/max";
import { Button, Form, Input, Space, Spin } from "antd";
import React from "react";

export default () => {
    const params = useParams();
    const [data, setData] = React.useState();

    React.useEffect(() => {
        myRequest(`/Direction/${params.id}`).then(res => {
            setData(res);
        });
    }, []);


    const editHandler = (data: any) => {
        myRequest(`/Direction/${params.id}`, { method: 'POST', data }).then(res => {
            history.push('/direction');
        });
    };

    return (
        <>
            {data ?
                <Form onFinish={editHandler} initialValues={data} autoComplete="off">
                    <Form.Item name="name" label="Название" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                        <Button type="primary" danger={true} onClick={() => history.back()}>Отмена</Button>
                    </Space>
                </Form> : <Spin></Spin>}
        </>
    );
};
