import { PageHeader } from 'antd';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RADIO_STATIONS } from '../../../layouts/pathTypes';

class RadioStationStreamsHeader extends Component {
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
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                onBack={this.handleBack}
                title="Radio station streams"
            />
        );
    }
}

export default withRouter(RadioStationStreamsHeader);
