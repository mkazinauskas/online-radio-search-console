import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';
import AddRadioStationModal from './ImportStationsModal';
import { ADMIN } from '../../../auth/resourceRoleType';
import { ONLINE_RADIO_SEARCH_API } from '../../../auth/resourceTypes';
import { withRouter } from 'react-router-dom'
import { reloadPage } from '../../../utils/historyUtils';

class ImportStationsButton extends Component {

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
                <Button type="primary" onClick={this.showModal}>
                    <Icon type="upload"/>
                    Import stations
                </Button>
                <AddRadioStationModal
                    key={new Date().getMilliseconds()}
                    visible={this.state.visible}
                    onModalClose={this.handleModalClose}
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

export default connect(mapStateToProps)(withRouter(ImportStationsButton));
