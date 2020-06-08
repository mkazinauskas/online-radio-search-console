import React, { Component } from 'react';
import CreateSongButton from './createSong/CreateSongButton';
import SongsTable from './SongsTable';
import { PageHeader } from 'antd';

class SongsView extends Component {

    render() {
        return (
            <div>
                <PageHeader title="Songs" />
                <div style={{ marginBottom: 10 }}>
                    <CreateSongButton />
                </div>
                <SongsTable />
            </div>
        );
    }
}

export default SongsView;

