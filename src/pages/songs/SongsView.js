import React, { Component } from 'react';
import CreateSongButton from './createSong/CreateSongButton';
import SongsTable from './SongsTable';

class SongsView extends Component {

    render() {
        return (
            <div>
                <div style={{ marginBottom: 10 }}>
                    <CreateSongButton />
                </div>
                <SongsTable />
            </div>
        );
    }
}

export default SongsView;

