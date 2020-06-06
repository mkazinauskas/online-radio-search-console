import React, { Component } from 'react';
import CreateRadioStationSongButton from './create/CreateRadioStationSongButton';
import RadioStationSongsHeader from './RadioStationSongsHeader';
import RadioStationSongsTable from './RadioStationSongsTable';

class RadioStationSongsView extends Component {

    render() {
        return (
            <div>
                <RadioStationSongsHeader />
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <CreateRadioStationSongButton />
                </div>
                <RadioStationSongsTable />
            </div>
        );
    }
}

export default RadioStationSongsView;

