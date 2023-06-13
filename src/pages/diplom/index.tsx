import myRequest from "@/utils/request";
import { Button, Form, Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "@umijs/max";
import moment from "moment";
import CustomSelect from "@/components/select/CustomSelect";
import { history } from "@umijs/max";
import { useModel } from "@umijs/max";

interface Filter {
    title: string | null,
    headName: string | null,
    directionId: number | null,
}

export default () => {
    const { selectedDirectionText } = useModel('useSelectedDirectionModel');

    const [dataSource, setDataSource] = React.useState<any[]>([]);
    const [academicDegrees, setAcademicDegrees] = React.useState<any[]>([]);

    const [selectedDirectionId, setSelectedDirectionId] = React.useState<number | null>(null);
    const [loadingDirections, setLoadingDirections] = React.useState(false);

    const [loadingDiploms, setLoadingDiploms] = React.useState(false);
    const [loadingAcademicDegrees, setLoadingAcademicDegrees] = React.useState(false);

    const [filter, setFilter] = React.useState<Filter>({ title: null, headName: null, directionId: null });

    const [form] = Form.useForm();
    React.useEffect(() => {
        form.setFieldValue('directionId', selectedDirectionId);
        refreshTable({ ...filter, directionId: selectedDirectionId }); // передать в фильтр
    }, [selectedDirectionId])

    React.useEffect(() => {
        setLoadingAcademicDegrees(true);
        myRequest(`/Service/AcademicDegreeSelect`).then((res: any) => {
            setAcademicDegrees(res);
            setLoadingAcademicDegrees(false);
        });
    }, []);

    React.useEffect(() => {
        setLoadingDirections(true);
        myRequest(`/Service/DirectionSelect`).then((res: any) => {
            setLoadingDirections(false);
            const defaultSelectedDir = res.find((x: any) => x.label == selectedDirectionText)?.value;
            setSelectedDirectionId(defaultSelectedDir);
        });
    }, []);

    const deleteHandler = (id: any) => {
        myRequest(`/Diplom/${id}`, { method: 'DELETE' }).then((res: any) => {
            const newDataSource = dataSource.filter((x: any) => x.id != id);
            setDataSource(newDataSource);
        });
    };

    const duplicateHandler = (id: any) => {
        myRequest(`/Diplom/Duplicate/${id}`, { method: 'POST' }).then((res: any) => {
            refreshTable(filter);
        });
    };

    const refreshTable = (filter: Filter = { title: null, headName: null, directionId: null }) => {
        setFilter(filter);
        setLoadingDiploms(true);
        myRequest("/Diplom", { method: 'POST', data: filter }).then((res: any[]) => {
            setDataSource(res);
            setLoadingDiploms(false);
        });
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Название',
            dataIndex: 'title'
        },
        {
            title: 'Дата',
            dataIndex: 'release',
            render: (value, record, index) => {
                return <>{moment(record.release).format('YYYY/MM/DD')}</>
            }
        },
        {
            title: 'Уровень',
            dataIndex: 'academicDegree',
            render: (value, record, index) => {
                return <>{academicDegrees.find(x => x.value == record.academicDegree)?.label ?? +'ская'}</>
            }
        },
        {
            title: 'Направление',
            dataIndex: 'directionId',
            render: (value, record, index) => {
                return <>{record.direction?.name}</>
            }
        },
        {
            title: 'Автор',
            dataIndex: 'authorId',
            render: (value, record, index) => {
                return <>{record.author?.shortFIO}</>
            }
        },
        {
            title: 'Научрук',
            dataIndex: 'headName',
        },

        {
            title: 'Действия',
            key: 'action',
            render: (value, record, index) => {
                return <>
                    <div style={{ userSelect: "none" }}>
                        <Link to={`/diplom/edit/${record.id}`}>Изменить </Link>
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
                <Link to={`/diplom/create/`}>
                    <Button type="primary" >
                        Создать
                    </Button>
                </Link>
                <Form form={form} layout="inline" onFinish={refreshTable} autoComplete="off">
                    <Form.Item name="title"><Input placeholder="Название..." /></Form.Item>
                    <Form.Item name="headName"><Input placeholder="Научрук..." /></Form.Item>
                    <Form.Item name="directionId">
                        <CustomSelect allowClear={true} url="/Service/DirectionSelect" placeholder="Направление..." />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>Найти</Button>
                </Form>
            </Space>

            <Table rowKey="id"
                dataSource={dataSource}
                columns={columns}
                loading={loadingDiploms || loadingAcademicDegrees || loadingDirections} />
        </div>
    );
};
