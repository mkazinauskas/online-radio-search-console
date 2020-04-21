import React, { Component } from 'react';
import AddRadioStationSongButton from './add/AddRadioStationSongButton';
import RadioStationSongsHeader from './RadioStationSongsHeader';
import RadioStationSongsTable from './RadioStationSongsTable';

class RadioStationSongsView extends Component {

    render() {
        return (
            <div>
                <RadioStationSongsHeader />
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <AddRadioStationSongButton />
                </div>
                <RadioStationSongsTable />
            </div>
        );
    }
}

export default RadioStationSongsView;

