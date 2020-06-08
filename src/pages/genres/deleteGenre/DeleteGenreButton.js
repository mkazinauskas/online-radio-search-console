
import React, { Component } from 'react';
import { Popconfirm, Button, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { ADMIN } from '../../../auth/resourceRoleType';
import { withRouter } from 'react-router-dom'
import { ONLINE_RADIO_SEARCH_API } from '../../../auth/resourceTypes';
import { reloadPage } from '../../../utils/historyUtils';
import { API_URL } from './../../../AppConfig';

class DeleteGenreButton extends Component {

    state = {
        loading: false
    }

    render() {

        if (!this.props.hasAdminRole) {
            return null
        }
        return (
            <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(this.props.id)}
                disabled={this.state.loading}
            >
                <Button type="link">Delete</Button>
            </Popconfirm>
        );
    }

    handleDelete = id => {
        this.setState({ loading: true });

        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }

        Axios.delete(`${API_URL}/admin/genres/${id}`, config)
            .then(() => {
                this.setState({ loading: false });
                message.success({ content: `Genre with id = '${id}' has been deleted`, duration: 3 });
                reloadPage(this.props.history);
            })
            .catch(() => {
                message.error({ content: `Failed to delete genre with id = '${id}'`, duration: 5 });
            });
    };

}

const mapStateToProps = (state) => {
    const hasAdminRole = state.auth.authenticated ? state.auth.keycloak.hasResourceRole(ADMIN, ONLINE_RADIO_SEARCH_API) : false;
    return {
        token: state.auth.token,
        hasAdminRole
    }
}

export default connect(mapStateToProps)(withRouter(DeleteGenreButton));