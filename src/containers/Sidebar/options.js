import React from 'react';
import {
  AppstoreOutlined,
  UserOutlined,
  EnvironmentOutlined,
  DesktopOutlined,
  CalendarOutlined,
  SettingOutlined,
  WechatOutlined
} from '@ant-design/icons';

const options = [
  {
    key: 'dashboard',
    label: 'sidebar.dashboard',
    leftIcon: (<AppstoreOutlined />),
  },
  {
    key: 'people',
    label: 'sidebar.people',
    leftIcon: (<UserOutlined />),
    children: [
      {
        key: 'employee',
        label: 'sidebar.people.employee',
      },
      {
        key: 'visitor',
        label: 'sidebar.people.visitor',
      },
      {
        key: 'request',
        label: 'sidebar.people.people-requests',
      },
    ]
  },
  {
    key: 'space',
    label: 'sidebar.space',
    leftIcon: (<EnvironmentOutlined />),
    children: [
      {
        key: 'all_spaces',
        label: 'sidebar.space.all-spaces',
      },
      {
        key: 'conference',
        label: 'sidebar.space.conference',
      },
      {
        key: 'office',
        label: 'sidebar.space.office',
      },
      {
        key: 'hot_desk',
        label: 'sidebar.space.hot-desk',
      },
    ]
  },
  {
    key: 'device',
    label: 'sidebar.device',
    leftIcon: (<DesktopOutlined />),
  },
  {
    key: 'meeting',
    label: 'sidebar.meeting',
    leftIcon: (<CalendarOutlined />),
  },
  {
    key: 'help-center',
    label: 'sidebar.help-center',
    leftIcon: (<WechatOutlined />),
  },
  {
    key: 'setting',
    label: 'sidebar.setting',
    leftIcon: (<SettingOutlined />),
  },
];
export default options;
