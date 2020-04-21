import React, { Component } from 'react';
import StreamUrlsHeader from './StreamUrlsHeader';
import StreamUrlsTable from './StreamUrlsTable';
import CreateStreamUrlButton from './create/CreateStreamUrlButton';
import ResolveSongsUrlButton from './songs/ResolveSongsUrlButton';
import { withRouter } from 'react-router';
import ResolveInfoUrlButton from './info/ResolveInfoUrlButton';

class StreamUrlsView extends Component {

    render() {
        const radioStationId = this.props.match.params.radioStationId;
        const streamId = this.props.match.params.streamId;
        return (
            <div>
                <StreamUrlsHeader />
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <CreateStreamUrlButton />
                    <span style={{ marginLeft: 10}}>
                        <ResolveSongsUrlButton
                            radioStationId={radioStationId}
                            streamId={streamId}
                        />
                    </span>
                    <span style={{ marginLeft: 10}}>
                        <ResolveInfoUrlButton
                            radioStationId={radioStationId}
                            streamId={streamId}
                        />
                    </span>
                </div>
                <StreamUrlsTable />
            </div>
        );
    }
}

export default withRouter(StreamUrlsView);

