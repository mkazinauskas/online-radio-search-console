import { Button, Popconfirm } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ADMIN } from '../../../../auth/resourceRoleType';
import { ONLINE_RADIO_SEARCH_API } from '../../../../auth/resourceTypes';
import { reloadPage } from '../../../../utils/historyUtils';
import { API_URL } from '../../../../AppConfig';

class DeleteRadioStationSongButton extends Component {

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
                <Button type="link" disabled={this.state.loading}>Delete</Button>
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

        Axios.delete(`${API_URL}/admin/radio-stations/${this.props.radioStationId}/songs/${this.props.id}`, config)
            .then(() => {
                this.setState({ loading: false });
                reloadPage(this.props.history);
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

export default connect(mapStateToProps)(withRouter(DeleteRadioStationSongButton));