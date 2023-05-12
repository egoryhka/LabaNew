import myRequest from "@/utils/request";
import { Link } from "@umijs/max";
import { Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";

export default () => {
    const [dataSource, setDataSource] = React.useState([]);
    const [academicDegrees, setAcademicDegrees] = React.useState([] as any[]);

    React.useEffect(() => {
        myRequest(`/Service/AcademicDegreeSelect`).then(res => {
            setAcademicDegrees(res);
        });
    }, []);

    const deleteHandler = (id: any) => {
        myRequest(`/Author/${id}`, { method: 'DELETE' }).then(res => {
            const newDataSource = dataSource.filter((value: any, index) => value.id != id);
            setDataSource(newDataSource);
        });
    };

    const columns: ColumnsType<any> = [
        {
            title: 'Фио',
            dataIndex: 'shortFIO'
        },
        {
            title: 'Должность',
            dataIndex: 'positionId',
            render: (value, record, index) => {
                return <>{record.position.name}</>
            }
        },
        {
            title: 'Звание',
            dataIndex: 'academicDegree',
            render: (value, record, index) => {
                return <>{academicDegrees.find(x => x.value == record.academicDegree).label}</>
            }
        },

        {
            title: 'Действия',
            key: 'action',
            render: (value, record, index) => {
                return <>
                    <div>
                        <Link to={`/author/edit/${record.id}`}>Изменить </Link>
                        <a onClick={() => deleteHandler(record.id)}>Удалить</a>
                    </div>
                </>
            }
        },
    ];

    React.useEffect(() => {
        myRequest("/Author").then(res => {
            console.log(res);
            setDataSource(res);
        });
    }, []);

    return (
        <div>
            <Link to={`/author/create/`}>Создать</Link>

            {academicDegrees ?
                <Table dataSource={dataSource} columns={columns} rowKey="id" /> :
                <Spin></Spin>}

        </div>
    );
};
