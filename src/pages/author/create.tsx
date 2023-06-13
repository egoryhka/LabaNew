import CustomSelect from "@/components/select/CustomSelect";
import myRequest from "@/utils/request";
import { history } from "@umijs/max";
import { Button, Form, Input, Space } from "antd";

export default () => {
    const createHandler = (data: any) => {
        myRequest(`/Author`, { method: 'PUT', data }).then(res => {
            history.push('/author');
        });
    };

    return (
        <>
            <Form onFinish={createHandler} autoComplete="off">
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
                    <CustomSelect url="/Service/PositionSelect" placeholder="Выберите звание" />
                </Form.Item>
                <Form.Item name="academicDegree" label="Звание" rules={[{ required: true }]}>
                    <CustomSelect url="/Service/AcademicDegreeSelect" placeholder="Выберите звание" />
                </Form.Item>

                <Space>
                    <Button type="primary" htmlType="submit">Создать</Button>
                    <Button type="primary" danger={true} onClick={() => history.back()}>Отмена</Button>
                </Space>

            </Form>
        </>
    );
};
