import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { createURLStreamUrls } from '../../../../layouts/pathTypes';
import { previousPath } from '../../../../utils/historyUtils';

class ShowRadioStationStreamsLink extends Component {

    render() {
        return (
            <span style={{ 'padding': '0px 15px' }}>
                <Link to={{
                    pathname: createURLStreamUrls(this.props.radioStationId, this.props.streamId),
                    state: { previousPath: previousPath(this.props.location) }
                }}>Urls</Link>
            </span>
        );
    }

}

export default withRouter(ShowRadioStationStreamsLink);