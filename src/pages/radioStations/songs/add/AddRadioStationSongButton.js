import { Button } from 'antd';
import React, { Component } from 'react';
import {
    PlusCircleFilled,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ADMIN } from '../../../../auth/resourceRoleType';
import { ONLINE_RADIO_SEARCH_API } from '../../../../auth/resourceTypes';
import { reloadPage } from '../../../../utils/historyUtils';
import AddRadioStationStreamModal from './AddRadioStationSongModal';

class AddRadioStationSongButton extends Component {

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
                    Add New Radio Station Song
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

export default connect(mapStateToProps)(withRouter(AddRadioStationSongButton));
