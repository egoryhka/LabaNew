import CustomSelect from "@/components/select/CustomSelect";
import myRequest from "@/utils/request";
import { history, useParams } from "@umijs/max";
import { Button, Form, Input, Space, Spin } from "antd";
import React from "react";

export default () => {
    const params = useParams();
    const [data, setData] = React.useState();

    React.useEffect(() => {
        myRequest(`/Author/${params.id}`).then(res => {
            setData(res);
        });
    }, []);


    const editHandler = (data: any) => {
        myRequest(`/Author/${params.id}`, { method: 'POST', data }).then(res => {
            history.push('/author');
        });
    };

    return (
        <>
            {data ?
                <Form onFinish={editHandler} initialValues={data} autoComplete="off">
                    <Form.Item name="secondName" label="Фамилия" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="firstName" label="Имя" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="thirdName" label="Отчество">
                        <Input />
                    </Form.Item>
                    <Form.Item name="positionId" label="Должность" rules={[{ required: true }]}>
                        <CustomSelect url="/Service/PositionSelect" placeholder="Выберите должность" />
                    </Form.Item>
                    <Form.Item name="academicDegree" label="Звание" rules={[{ required: true }]}>
                        <CustomSelect url="/Service/AcademicDegreeSelect" placeholder="Выберите звание" />
                    </Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                        <Button type="primary" danger={true} onClick={() => history.back()}>Отмена</Button>
                    </Space>
                </Form> : <Spin></Spin>}
        </>
    );
};
