import React from "react";
import { Layout, Tabs } from "antd";
import { connect } from "react-redux";
import { SidebarView as Sidebar } from "./sidebar";
import TabContent from "../components/TabContent";
type IndexProps = {
  dispatch: any;
  app: any;
};

class Index extends React.Component<IndexProps> {
  onCollapsed = (collapsed: boolean) => {
    const { dispatch } = this.props;
    dispatch({
      type: "app/updateSiderStatus",
    });
  };

  menuClick = (e: any) => {
    const { dispatch, app } = this.props;
    const { openedTabs, activeTabKey } = app;

    // 如果点击的是当前激活的 tab，直接返回
    if (activeTabKey === e.key) return;

    // 如果 tab 已经打开，直接激活
    if (openedTabs.some((tab: any) => tab.key === e.key)) {
      dispatch({
        type: "app/updateActiveTabKey",
        payload: { key: e.key },
      });
    } else {
      // 打开新 tab
      const tabTitles: any = {
        home: "首页",
        about: "关于",
        settings: "设置",
      };

      dispatch({
        type: "app/openTab",
        payload: {
          key: e.key,
          title: tabTitles[e.key] || e.key,
        },
      });
    }

    // 更新选中的菜单项
    dispatch({
      type: "app/setSelectedKeys",
      payload: [e.key],
    });
  };

  render() {
    const { app } = this.props;
    const {
      siderWidth,
      siderCollapsed,
      selectedKeys,
      openedTabs,
      activeTabKey,
    } = app;
    return (
      <Layout
        className="root_layout"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Sidebar
          siderWidth={siderWidth}
          collapsed={siderCollapsed}
          onCollapsed={this.onCollapsed}
          menuClick={this.menuClick}
          selectedKeys={selectedKeys}
        />

        <Layout
          className="layout_content"
          id="scroll-view"
          style={{ left: siderWidth, transition: "all 200ms" }}
        >
          <Tabs
            type="editable-card"
            activeKey={activeTabKey}
            onChange={(key) => {
              this.props.dispatch({
                type: "app/updateActiveTabKey",
                payload: { key },
              });
            }}
            onEdit={(targetKey, action) => {
              if (action === "remove") {
                this.props.dispatch({
                  type: "app/closeTab",
                  payload: { key: targetKey },
                });
              }
            }}
            items={openedTabs.map((tab: any) => ({
              key: tab.key,
              label: tab.title,
              children: <TabContent component={tab.component} />,
            }))}
          />
        </Layout>
      </Layout>
    );
  }
}

export default connect(({ app }: any) => ({ app }))(Index);
