'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { onSidebarClose } from '@/redux/slices/sidebarSlice';
import { Drawer, Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
const { Content, Sider } = Layout;

const Sidebar = ({
  children,
  items,
}: {
  children: React.ReactNode;
  items: { key: string; label: string; href: string }[];
}) => {
  const open = useAppSelector((state) => state.sidebar.open);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const getSelectedKey = () => {
    return items.find((item) => item.href === pathname)?.key || '';
  };
  return (
    <Layout>
      <Content>
        <Layout className="lg:flex hidden">
          <Sider
            width={280}
            className="min-h-screen bg-teal-950"
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'sticky',
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <Menu
              className="h-full px-3 bg-transparent text-white py-4 sidebar-menu"
              mode="inline"
              defaultSelectedKeys={[getSelectedKey()]}
              selectedKeys={[getSelectedKey()]}
            >
              {items?.map((item) => (
                <Menu.Item key={item.key} className=" bg-teal-900 mb-2">
                  <Link href={item.href}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content className="bg-white p-4">{children}</Content>
        </Layout>
        <Layout className="lg:hidden">
          <Drawer
            title="Dashboard"
            placement="left"
            onClose={() => {
              dispatch(onSidebarClose());
            }}
            open={open}
          >
            <Menu
              className="h-full px-3"
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
            >
              {items?.map((item) => (
                <Menu.Item key={item.key}>
                  <Link href={item.href}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
          <Content className="bg-white p-4">{children}</Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Sidebar;
