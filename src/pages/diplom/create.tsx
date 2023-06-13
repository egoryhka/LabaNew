import CustomSelect from "@/components/select/CustomSelect";
import myRequest from "@/utils/request";
import { history } from "@umijs/max";
import { Button, DatePicker, Form, Input, Space } from "antd";

export default () => {
    const createHandler = (data: any) => {
        myRequest(`/Diplom`, { method: 'PUT', data }).then(res => {
            history.push('/diplom');
        });
    };

    return (
        <>
            <Form onFinish={createHandler} autoComplete="off">
                <Form.Item name="title" label="Название" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="release" label="Дата" rules={[{ required: true }]}>
                    <DatePicker/>
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
                    <Button type="primary" htmlType="submit">Создать</Button>
                    <Button type="primary" danger={true} onClick={() => history.back()}>Отмена</Button>
                </Space>

            </Form>
        </>
    );
};
