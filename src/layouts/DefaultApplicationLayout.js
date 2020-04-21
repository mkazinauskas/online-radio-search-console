import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Layout, Icon } from 'antd';
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
    return (
      <Router>
        <Layout>
          <LeftSideMenuComponent collapsed={this.state.collapsed} />
          <Layout>
            <Layout.Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
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
