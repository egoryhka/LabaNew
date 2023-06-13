import CustomSelect from "@/components/select/CustomSelect";
import myRequest from "@/utils/request";
import { history, useParams } from "@umijs/max";
import { Button, DatePicker, Form, Input, Space, Spin } from "antd";
import moment from "moment";
import React from "react";

export default () => {
    const params = useParams();
    const [data, setData] = React.useState<any>();

    React.useEffect(() => {
        myRequest(`/Diplom/${params.id}`).then(res => {
            setData(res);
        });
    }, []);


    const editHandler = (data: any) => {
        myRequest(`/Diplom/${params.id}`, { method: 'POST', data }).then(res => {
            history.push('/diplom');
        });
    };

    return (
        <>
            {data ?
                <Form onFinish={editHandler} initialValues={data} autoComplete="off">
                    <Form.Item name="title" label="Название" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="release" label="Дата" valuePropName="release" rules={[{ required: true }]}>
                        <DatePicker defaultValue={moment(data.release)} />
                    </Form.Item>
                    <Form.Item name="academicDegree" label="Звание" rules={[{ required: true }]}>
                        <CustomSelect url="/Service/AcademicDegreeSelect" placeholder="Выберите звание" />
                    </Form.Item>
                    <Form.Item name="directionId" label="Направление" rules={[{ required: true }]}>
                        <CustomSelect url="/Service/DirectionSelect" placeholder="Выберите направление" />
                    </Form.Item>
                    <Form.Item name="authorId" label="Автор" rules={[{ required: true }]}>
                        <CustomSelect url="/Service/AuthorSelect" placeholder="Выберите автора" />
                    </Form.Item>
                    <Form.Item name="headName" label="Научрук" rules={[{ required: true }]}>
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
