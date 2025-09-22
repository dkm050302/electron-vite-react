import React from "react";

interface TabContentProps {
  component: string;
}

const TabContent: React.FC<TabContentProps> = ({ component }) => {
  const renderContent = () => {
    switch (component) {
      case "home":
        return (
          <div>
            <h1>首页</h1>
            <p>欢迎来到首页！</p>
            <div className="card">
              <h2>功能特性</h2>
              <ul>
                <li>✅ Electron 桌面应用</li>
                <li>✅ React 前端框架</li>
                <li>✅ Vite 构建工具</li>
                <li>✅ TypeScript 支持</li>
                <li>✅ dva 状态管理</li>
              </ul>
            </div>
          </div>
        );
      case "about":
        return (
          <div>
            <h1>关于我们</h1>
            <div className="card">
              <h2>应用信息</h2>
              <p>
                <strong>应用名称：</strong>Electron Vite React
              </p>
              <p>
                <strong>版本：</strong>2.2.0
              </p>
              <p>
                <strong>作者：</strong>草鞋没号
              </p>
              <p>
                <strong>许可证：</strong>MIT
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div>
            <h1>设置</h1>
            <div className="card">
              <h2>系统设置</h2>
              <p>这里可以配置各种系统选项</p>
              <button onClick={() => alert("设置已保存！")}>保存设置</button>
            </div>
          </div>
        );
      default:
        return <div>页面开发中...</div>;
    }
  };

  return <div style={{ padding: "20px" }}>{renderContent()}</div>;
};

export default TabContent;
