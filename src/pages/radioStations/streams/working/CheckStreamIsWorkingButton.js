import { Button, Popconfirm } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ADMIN } from '../../../../auth/resourceRoleType';
import { ONLINE_RADIO_SEARCH_API } from '../../../../auth/resourceTypes';
import { reloadPage } from '../../../../utils/historyUtils';
import { API_URL } from '../../../../AppConfig';

class CheckStreamIsWorkingButton extends Component {

    state = {
        loading: false
    }

    render() {

        if (!this.props.hasAdminRole) {
            return null
        }
        return (
            <Popconfirm
                title="Sure to check?"
                onConfirm={this.handleCheck}
                disabled={this.state.loading}
            >
                <Button type="link" disabled={this.state.loading}>Check if working</Button>
            </Popconfirm>
        );
    }

    handleCheck = () => {
        this.setState({ loading: true });

        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }

        Axios.post(`${API_URL}/admin/radio-stations/${this.props.radioStationId}/streams/${this.props.streamId}/working`, null, config)
            .then(this.afterFetch)
            .catch(this.afterFetch);
    };

    afterFetch = () => {
        this.setState({ loading: false });
        reloadPage(this.props.history);
    }

}

const mapStateToProps = (state) => {
    const hasAdminRole = state.auth.authenticated ? state.auth.keycloak.hasResourceRole(ADMIN, ONLINE_RADIO_SEARCH_API) : false;
    return {
        token: state.auth.token,
        hasAdminRole
    }
}

export default connect(mapStateToProps)(withRouter(CheckStreamIsWorkingButton));