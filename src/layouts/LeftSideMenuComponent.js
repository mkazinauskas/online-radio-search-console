import { Icon, Layout, Menu } from 'antd';
import { createBrowserHistory } from "history";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { ADMIN } from '../auth/resourceRoleType';
import { ONLINE_RADIO_SEARCH_API } from '../auth/resourceTypes';
import { EVENTS, HOME, RADIO_STATIONS, SONGS } from './pathTypes';

class LeftSideMenuComponent extends Component {
    render() {
        const history = createBrowserHistory();

        return (
            <Layout.Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
                    <Menu.Item key={HOME}>
                        <Icon type="home" /><span>Main</span>
                        <Link to={HOME} />
                    </Menu.Item>
                    <Menu.Item key={RADIO_STATIONS}>
                        <Icon type="unordered-list" /><span>Radio Stations</span>
                        <Link to={RADIO_STATIONS} />
                    </Menu.Item>
                    <Menu.Item key={SONGS}>
                        <Icon type="play-circle" /><span>Songs</span>
                        <Link to={SONGS} />
                    </Menu.Item>
                    {this.eventsMenu()}
                </Menu>
            </Layout.Sider>
        )
    }

    eventsMenu = () => {
        return this.props.hasAdminRole
            ? (<Menu.Item key={EVENTS}>
                <Icon type="read" /><span>Events</span>
                <Link to={EVENTS} />
            </Menu.Item>)
            : null;
    }
}

const mapStateToProps = (state) => {
    const hasAdminRole = state.auth.authenticated ? state.auth.keycloak.hasResourceRole(ADMIN, ONLINE_RADIO_SEARCH_API) : false;
    return {
        hasAdminRole
    }
}

export default connect(mapStateToProps)(LeftSideMenuComponent);