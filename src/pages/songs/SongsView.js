import React, { Component } from 'react';
import AddSongButton from './addSong/AddSongButton';
import SongsTable from './SongsTable';

class SongsView extends Component {

    render() {
        return (
            <div>
                <div style={{ marginBottom: 10 }}>
                    <AddSongButton />
                </div>
                <SongsTable />
            </div>
        );
    }
}

export default SongsView;

