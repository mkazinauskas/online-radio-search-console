import React, { Component } from 'react';
import { Popconfirm, Button } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { ADMIN } from '../../../../../auth/resourceRoleType';
import { withRouter } from 'react-router-dom'
import { ONLINE_RADIO_SEARCH_API } from '../../../../../auth/resourceTypes';
import { reloadPage } from '../../../../../utils/historyUtils';
import { API_URL } from '../../../../../AppConfig';

class RefreshRadioStationInfoButton extends Component {

    state = {
        loading: false
    }

    render() {

        if (!this.props.hasAdminRole) {
            return null
        }
        return (
            <Popconfirm
                title="Sure to refresh info?"
                onConfirm={this.refresh}
                disabled={this.state.loading}
            >
                <Button type="link" disabled={this.state.loading}>Refresh info</Button>
            </Popconfirm>
        );
    }

    refresh = () => {
        this.setState({ loading: true });

        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }

        Axios.post(`${API_URL}/admin/radio-stations/${this.props.radioStationId}/streams/${this.props.streamId}/latest-info`, null, config)
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

export default connect(mapStateToProps)(withRouter(RefreshRadioStationInfoButton));