import { Outlet } from 'umi';
import styles from './index.less';
import { MenuProps, Spin, Tabs, message } from 'antd';
import { Layout, Menu } from 'antd';
import { useAccess } from '@umijs/max';
import { Access } from '@umijs/max';

import myRequest from "@/utils/request";
import { Button, Form, Input } from "antd";
import { useModel } from '@umijs/max';
import { Link } from '@umijs/max';
import React from 'react';

const colorBgContainer = '#ffffff';
const { Content, Sider } = Layout;

export default () => {
  const { initialState, setInitialState, refresh } = useModel('@@initialState');
  const access = useAccess();
  const [layoutLoading, setLayoutLoading] = React.useState(false);

  const login = (data: any) => {
    setLayoutLoading(true);
    myRequest(`/auth/login`, { method: 'POST', data }).then(res => {
      setLayoutLoading(false);
      if (!res) { message.error("Неверные логин/пароль", 1); return; }
      localStorage.setItem("token", res);
      refresh();
    });
  }

  const register = (data: any) => {
    setLayoutLoading(true);
    myRequest(`/auth/register`, { method: 'POST', data }).then(res => {
      setLayoutLoading(false);
      if (!res) { message.error("Ошибка регистрации", 1); return; }
      localStorage.setItem("token", res);
      refresh();
    });
  }

  const logout = () => {
    localStorage.removeItem("token");
    setInitialState({});
  }

  const menuItems: MenuProps['items'] = [
    {
      key: "logout",
      label: <span onClick={logout}>Выход</span>,
    },
    {
      key: "author",
      label: <Link to={'/author'}>Авторы</Link>,
      children:
        [
          {
            key: "createAuthor",
            label: <Link to={'/author/create'}>Создать</Link>,
          },
        ]
    },
    {
      key: "diplom",
      label: <Link to={'/diplom'}>Дипломы</Link>,
      children:
        [
          {
            key: "createDiplom",
            label: <Link to={'/diplom/create'}>Создать</Link>,
          },
        ]
    },
    {
      key: "direction",
      label: <Link to={'/direction'}>Направления</Link>,
      children:
        [
          {
            key: "createDirection",
            label: <Link to={'/direction/create'}>Создать</Link>,
          },
        ]
    },
    {
      key: "position",
      label: <Link to={'/position'}>Должности</Link>,
      children:
        [
          {
            key: "createPosition",
            label: <Link to={'/position/create'}>Создать</Link>,
          },
        ]
    },
    {
      key: "index",
      label: <Link to={'/'}>Главная</Link>,
    },
  ];

  return (
    <>
      <Access accessible={access.isAuthorized}>
        <Layout hasSider>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
            }}>

            <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']} items={menuItems} />

          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: colorBgContainer }}>

                <div className={styles.navs}>
                  <Outlet />
                </div>

              </div>
            </Content>
          </Layout>
        </Layout >
      </Access>

      <Access accessible={!access.isAuthorized}>
        <Layout hasSider>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
            }}>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: colorBgContainer }}>

                <div className={styles.navs}>

                  <Spin spinning={layoutLoading}>
                    <Tabs
                      type="card"
                      items={
                        [
                          {
                            label: `Войти`,
                            key: 'login',
                            children: <Form onFinish={login} autoComplete="off">
                              <Form.Item name="login" ><Input placeholder="Логин..." /></Form.Item>
                              <Form.Item name="password"><Input.Password placeholder="Пароль..." /></Form.Item>
                              <Button type="primary" htmlType="submit">Войти</Button>
                            </Form>
                          },
                          {
                            label: `Регистрация`,
                            key: 'register',
                            children: <Form onFinish={register} autoComplete="off">
                              <Form.Item name="login"><Input placeholder="Логин..." /></Form.Item>
                              <Form.Item name="password"><Input.Password placeholder="Пароль..." /></Form.Item>
                              <Button type="primary" htmlType="submit">Регистрация</Button>
                            </Form>
                          }
                        ]
                      }
                    />
                  </Spin>


                </div>

              </div>
            </Content>
          </Layout>
        </Layout >
      </Access>
    </>
  );
}
