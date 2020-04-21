import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { ADMIN } from '../../../../auth/resourceRoleType';
import { ONLINE_RADIO_SEARCH_API } from '../../../../auth/resourceTypes';
import { withRouter } from 'react-router-dom'
import { reloadPage } from '../../../../utils/historyUtils';
import UpdateRadioStationStreamModal from './UpdateRadioStationStreamModal';

class UpdateRadioStationStreamButton extends Component {

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleModalClose = e => {
        this.setState({ visible: false });
        reloadPage(this.props.history);
    };

    render() {
        if (!this.props.hasAdminRole) {
            return null;
        }
        return (
            <span>
                <Button type="link" onClick={this.showModal}>
                    Update
                </Button>
                <UpdateRadioStationStreamModal
                    key={new Date().getMilliseconds()}
                    visible={this.state.visible}
                    onModalClose={this.handleModalClose}
                    radioStationStream={this.props.radioStationStream}
                />
            </span>
        );
    }
}

const mapStateToProps = (state) => {
    const hasAdminRole = state.auth.authenticated ? state.auth.keycloak.hasResourceRole(ADMIN, ONLINE_RADIO_SEARCH_API) : false;
    return {
        hasAdminRole
    }
}

export default connect(mapStateToProps)(withRouter(UpdateRadioStationStreamButton));
