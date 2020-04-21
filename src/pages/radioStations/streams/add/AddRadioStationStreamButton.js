import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';
import AddRadioStationStreamModal from './AddRadioStationStreamModal';
import { withRouter } from 'react-router-dom'
import { ADMIN } from '../../../../auth/resourceRoleType';
import { ONLINE_RADIO_SEARCH_API } from '../../../../auth/resourceTypes';
import { reloadPage } from '../../../../utils/historyUtils';

class AddRadioStationStreamButton extends Component {

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
                    <Icon type="plus-circle" theme="filled" />
                    Add New Stream
                </Button>
                <AddRadioStationStreamModal
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

export default connect(mapStateToProps)(withRouter(AddRadioStationStreamButton));
