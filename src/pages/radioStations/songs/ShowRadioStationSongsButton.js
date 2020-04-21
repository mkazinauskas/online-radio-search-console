import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { createURLRadioStationSongs } from '../../../layouts/pathTypes';
import { previousPath } from '../../../utils/historyUtils';

class ShowRadioStationSongsButton extends Component {

    render() {
        return (
            <Link to={{
                pathname: createURLRadioStationSongs(this.props.id),
                state: { previousPath: previousPath(this.props.location) }
            }}>Songs</Link>
        );
    }

}

export default withRouter(ShowRadioStationSongsButton);