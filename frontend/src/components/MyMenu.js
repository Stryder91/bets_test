import React from 'react';
import { Menu, Switch, Divider } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export const Sider = () => {
  const [mode, setMode] = React.useState('inline');
  const [theme, setTheme] = React.useState('dark');

  return (
    <>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
      >
        {/* <Menu.Item key="1" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item> */}
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Esport
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Counter Strike">
          <Menu.Item key="3">Events</Menu.Item>
          <Menu.Item key="4">Results</Menu.Item>
        </SubMenu>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Sport
        </Menu.Item>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="Football">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
        </SubMenu>
        <Menu.Item key="link" icon={<LinkOutlined />}>
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Ant Design
          </a>
        </Menu.Item>
      </Menu>
    </>
  );
};