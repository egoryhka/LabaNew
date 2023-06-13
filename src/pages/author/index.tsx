import myRequest from "@/utils/request";
import { Button, Form, Input, Space, Spin } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import { WordCloud } from '@ant-design/charts';
import { Link } from "@umijs/max";

interface Filter {
    firstName: string | null
    secondName: string | null
    thirdName: string | null
}

export default () => {
    const [dataSource, setDataSource] = React.useState<any[]>([]);

    const [academicDegrees, setAcademicDegrees] = React.useState<any[]>([]);
    const [loadingAuthors, setLoadingAuthors] = React.useState(false);
    const [loadingAcademicDegrees, setLoadingAcademicDegrees] = React.useState(false);
    const [filter, setFilter] = React.useState<Filter>({ firstName: null, secondName: null, thirdName: null });

    React.useEffect(() => {
        setLoadingAcademicDegrees(true);
        myRequest(`/Service/AcademicDegreeSelect`).then((res: any) => {
            setAcademicDegrees(res);
            setLoadingAcademicDegrees(false);
        });
    }, []);

    const deleteHandler = (id: any) => {
        myRequest(`/Author/${id}`, { method: 'DELETE' }).then((res: any) => {
            const newDataSource = dataSource.filter((x: any) => x.id != id);
            setDataSource(newDataSource);
        });
    };

    const duplicateHandler = (id: any) => {
        myRequest(`/Author/Duplicate/${id}`, { method: 'POST' }).then((res: any) => {
            refreshTable(filter);
        });
    };

    const refreshTable = (filter: Filter = { firstName: null, secondName: null, thirdName: null }) => {
        setFilter(filter);
        setLoadingAuthors(true);
        myRequest("/Author", { method: 'POST', data: filter }).then((res: any) => {
            setDataSource(res);
            setLoadingAuthors(false);
        });
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Фио',
            dataIndex: 'fio'
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            render: (value, record, index) => {
                return <>{record.position.name}</>
            }
        },
        {
            title: 'Звание',
            dataIndex: 'academicDegree',
            render: (value, record, index) => {
                return <>{academicDegrees.find(x => x.value == record.academicDegree)?.label}</>
            }
        },

        {
            title: 'Действия',
            key: 'action',
            render: (value, record, index) => {
                return <>
                    <div style={{ userSelect: "none" }}>
                        <Link to={`/author/edit/${record.id}`}>Изменить </Link>
                        <a onClick={() => duplicateHandler(record.id)}>Дублировать </a>
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
                <Link to={`/author/create/`}>
                    <Button type="primary" >
                        Создать
                    </Button>
                </Link>
                <Form layout="inline" onFinish={refreshTable} autoComplete="off">
                    <Form.Item name="firstName"><Input placeholder="Имя..." /></Form.Item>
                    <Form.Item name="secondName"><Input placeholder="Фамилия..." /></Form.Item>
                    <Form.Item name="thirdName"><Input placeholder="Отчество..." /></Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>Найти</Button>
                </Form>
            </Space>

            <Table rowKey="id"
                dataSource={dataSource}
                columns={columns}
                loading={loadingAuthors || loadingAcademicDegrees} />
        </div>
    );
};
