import { PageHeader } from 'antd';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RADIO_STATIONS } from '../../../layouts/pathTypes';

class RadioStationSongsHeader extends Component {
    state = {
        previousPath: this.resolvePreviousPath()
    }

    resolvePreviousPath() {
        let previousPath = RADIO_STATIONS;
        if (this.props.location.state && this.props.location.state.previousPath) {
            previousPath = this.props.location.state.previousPath;
        }
        return previousPath;
    }

    handleBack = () => {
        this.props.history.push(this.state.previousPath);
    }

    render() {
        return (
            <PageHeader
                onBack={this.handleBack}
                title="Radio station songs"
            />
        );
    }
}

export default withRouter(RadioStationSongsHeader);
