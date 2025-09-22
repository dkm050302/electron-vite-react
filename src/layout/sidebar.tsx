import React from "react";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

interface SidebarViewProps {
  collapsed: boolean;
  siderWidth: number;
  onCollapsed: any;
  selectedKeys: any;
  menuClick: any;
}
export const SidebarView = ({
  collapsed,
  siderWidth,
  onCollapsed,
  selectedKeys,
  menuClick,
}: SidebarViewProps) => {
  return (
    <Sider
      className={"paper home-left-sider"}
      width={siderWidth}
      collapsible
      collapsedWidth={siderWidth}
      collapsed={collapsed}
      onCollapse={onCollapsed}
      theme="light"
    >
      <Menu
        className="tree-menu"
        style={{ width: siderWidth }}
        mode="inline"
        theme={"light"}
        selectedKeys={selectedKeys}
        onClick={(e) => {
          menuClick(e);
        }}
      >
        <Menu.Item key="home">首页</Menu.Item>
        <Menu.Item key="about">关于</Menu.Item>
        <Menu.Item key="settings">设置</Menu.Item>
      </Menu>
    </Sider>
  );
};
