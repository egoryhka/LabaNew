import myRequest from "@/utils/request";
import { Button, Form, Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "@umijs/max";

interface Filter {
    name: string | null
}

export default () => {
    const [dataSource, setDataSource] = React.useState<any[]>([]);
    const [loadingPositions, setLoadingPositions] = React.useState(false);

    const deleteHandler = (id: any) => {
        myRequest(`/Position/${id}`, { method: 'DELETE' }).then((res: any) => {
            const newDataSource = dataSource.filter((x: any) => x.id != id);
            setDataSource(newDataSource);
        });
    };

    const refreshTable = (filter: Filter = { name: null }) => {
        setLoadingPositions(true);
        myRequest("/Position", { method: 'POST', data: filter }).then((res: any) => {
            setDataSource(res);
            setLoadingPositions(false);
        });
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Название',
            dataIndex: 'name'
        },
        {
            title: 'Действия',
            key: 'action',
            render: (value, record, index) => {
                return <>
                    <div style={{ userSelect: "none" }}>
                        <Link to={`/position/edit/${record.id}`}>Изменить </Link>
                        <a onClick={() => deleteHandler(record.id)}>Удалить</a>
                    </div>
                </>
            }
        },
    ];

    React.useEffect(() => {
        refreshTable();
    }, []);


    return (
        <div>
            <Space style={{ marginBottom: 24 }}>
                <Link to={`/position/create/`}>
                    <Button type="primary" >
                        Создать
                    </Button>
                </Link>
                <Form layout="inline" onFinish={refreshTable} autoComplete="off">
                    <Form.Item name="name"><Input placeholder="Название..." /></Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>Найти</Button>
                </Form>
            </Space>

            <Table rowKey="id"
                dataSource={dataSource}
                columns={columns}
                loading={loadingPositions} />
        </div>
    );
};
