import React, { Component } from 'react';
import { Button } from 'antd';
import {
    PlusCircleFilled,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import CreateRadioStationStreamModal from './CreateRadioStationStreamModal';
import { withRouter } from 'react-router-dom'
import { ADMIN } from '../../../../auth/resourceRoleType';
import { ONLINE_RADIO_SEARCH_API } from '../../../../auth/resourceTypes';
import { reloadPage } from '../../../../utils/historyUtils';

class CreateRadioStationStreamButton extends Component {

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
                    <PlusCircleFilled />
                    Create Radio Station Stream
                </Button>
                <CreateRadioStationStreamModal
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

export default connect(mapStateToProps)(withRouter(CreateRadioStationStreamButton));
