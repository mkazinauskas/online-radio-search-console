import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import LeftSideMenuComponent from './LeftSideMenuComponent';
import TopMenuComponent from './topMenu/TopMenuComponent';
import ContentComponent from './ContentComponent';
import FooterComponent from './FooterComponent';
import './DefaultApplicationLayout.css';

class DefaultApplicationLayout extends Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const icon = this.state.collapsed
      ? <MenuUnfoldOutlined className="trigger" onClick={this.toggle} />
      : <MenuFoldOutlined className="trigger" onClick={this.toggle} />;

    return (
      <Router>
        <Layout>
          <LeftSideMenuComponent collapsed={this.state.collapsed} />
          <Layout>
            <Layout.Header style={{ background: '#fff', padding: 0 }}>
              {icon}
              <TopMenuComponent />
            </Layout.Header>
            <ContentComponent />
            <FooterComponent />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default DefaultApplicationLayout;
