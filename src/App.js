import React, { useEffect, useState } from "react";
import { Button, Layout, Menu } from "antd";
import "./App.css";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Poker from "./pages/poker";
import { MenuData } from "./config/menu";
import Icon from "./icons";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  return (
    <Layout>
      <SideBar />
      <Layout>
        {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: "24px 16px 0" }}>
          <Route path="/game/poker" component={Poker} />
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState([]);
  const [selectedKey, setSelectedKey] = useState([]);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const history = useHistory();
  const { pathname } = useLocation();
  useEffect(() => {
    let arr = pathname?.split("/")?.filter(v => !!v);
    if (arr.length) {
      setActiveKey([arr[0]]);
      setSelectedKey([arr[1]]);
    }
  }, []);
  function menuClick({ item, key, keyPath }) {
    history.push(`/${keyPath.reverse().join("/")}`);
  }
  function MenuBar() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        onClick={menuClick}
        defaultOpenKeys={activeKey}
        defaultSelectedKeys={selectedKey}
      >
        {MenuData.map(item => (
          <SubMenu icon={<Icon type={item.icon} />} key={item.key} title={item.title}>
            {item.children?.map(ite => (
              <Menu.Item key={ite.key}>{ite.title}</Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    );
  }
  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      collapsed={collapsed}
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ position: "relative" }}
    >
      <div className="logo-content">
        <div className="logo"></div>
      </div>
      <MenuBar />
      <div className={`collapsed ${collapsed && "left"}`} onClick={toggleCollapsed}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </div>
    </Sider>
  );
}
