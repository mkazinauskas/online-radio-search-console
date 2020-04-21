import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { createURLRadioStationStreams } from '../../../layouts/pathTypes';
import { previousPath } from '../../../utils/historyUtils';

class ShowRadioStationStreamsLink extends Component {

    render() {
        return (
            <Link to={{
                pathname: createURLRadioStationStreams(this.props.id),
                state: { previousPath: previousPath(this.props.location) }
            }}>Streams</Link>
        );
    }

}

export default withRouter(ShowRadioStationStreamsLink);