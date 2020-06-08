import { Layout, Menu } from 'antd';
import {
    HomeFilled,
    UnorderedListOutlined,
    NotificationOutlined,
    PlayCircleFilled,
    ReadFilled
} from '@ant-design/icons';
import { createBrowserHistory } from "history";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { ADMIN } from '../auth/resourceRoleType';
import { ONLINE_RADIO_SEARCH_API } from '../auth/resourceTypes';
import { EVENTS, HOME, RADIO_STATIONS, SONGS, GENRES } from './pathTypes';

class LeftSideMenuComponent extends Component {
    render() {
        const history = createBrowserHistory();

        return (
            <Layout.Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
                    <Menu.Item key={HOME}>
                        <HomeFilled /><span>Main</span>
                        <Link to={HOME} />
                    </Menu.Item>
                    <Menu.Item key={RADIO_STATIONS}>
                        <UnorderedListOutlined /><span>Radio Stations</span>
                        <Link to={RADIO_STATIONS} />
                    </Menu.Item>
                    <Menu.Item key={SONGS}>
                        <PlayCircleFilled /><span>Songs</span>
                        <Link to={SONGS} />
                    </Menu.Item>
                    <Menu.Item key={GENRES}>
                        <NotificationOutlined /><span>Genres</span>
                        <Link to={GENRES} />
                    </Menu.Item>
                    {this.eventsMenu()}
                </Menu>
            </Layout.Sider>
        )
    }

    eventsMenu = () => {
        return this.props.hasAdminRole
            ? (<Menu.Item key={EVENTS}>
                <ReadFilled /><span>Events</span>
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