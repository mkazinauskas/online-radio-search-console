import React, { Component } from 'react';
import {
    UserOutlined,
    LoginOutlined,
    InfoCircleOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import { signIn, signOut } from '../../auth/actions';
import { connect } from 'react-redux';
import { Menu } from 'antd';

class AuthMenuComponent extends Component {

    wrapWithMenu(items) {
        return (
            <Menu style={{ float: 'right', lineHeight: '64px' }} theme="light" mode="horizontal">
                {items}
            </Menu>
        );
    }

    renderLoadingUser() {
        return this.wrapWithMenu(
            <Menu.Item key={0}>
                <UserOutlined />
                <span>Loading...</span>
            </Menu.Item>
        );
    }

    renderUnauthorizedUser() {
        return this.wrapWithMenu(
            <Menu.Item key={0} onClick={this.props.signIn}>
                <LoginOutlined />
                <span>Login/Register</span>
            </Menu.Item>
        );
    }

    renderAuthorizedUser() {
        return this.wrapWithMenu(
            <Menu.SubMenu key={0} title={
                <span className="submenu-title-wrapper">
                    <UserOutlined />
                    Hi, {this.props.name}
                </span>
            }>
                <Menu.Item key='accountInfo'>
                    <InfoCircleOutlined />
                    <span>Account info</span>
                    <a href={this.props.accountUrl} target='_blank' rel="noopener noreferrer" >Account info</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key='logout' onClick={this.props.signOut}>
                    <LogoutOutlined />
                    <strong>Logout</strong>
                </Menu.Item>
            </Menu.SubMenu>
        );
    }

    render() {
        if (this.props.loading) {
            return this.renderLoadingUser();
        }
        if (this.props.authenticated) {
            return this.renderAuthorizedUser();
        }
        return this.renderUnauthorizedUser();
    }
}

const mapStateToProps = (state) => {
    let name = '';
    let accountUrl = null
    if (state.auth.keycloak) {
        const keyclaok = state.auth.keycloak;
        if (keyclaok.idTokenParsed) {
            if (keyclaok.idTokenParsed.given_name) {
                name = keyclaok.idTokenParsed.given_name;
            } else {
                name = keyclaok.idTokenParsed.preferred_username;
            }
            accountUrl = keyclaok.createAccountUrl();
        }
    }
    return {
        loading: state.auth.loading,
        authenticated: state.auth.authenticated,
        name,
        accountUrl
    }
}

export default connect(mapStateToProps, { signIn, signOut })(AuthMenuComponent);