import React, { Component } from 'react';
import AddRadioStationStreamButton from './add/AddRadioStationStreamButton';
import RadioStationStreamsHeader from './RadioStationStreamsHeader';
import RadioStationStreamsTable from './RadioStationStreamsTable';

class RadioStationStreamsView extends Component {

    render() {
        return (
            <div>
                <RadioStationStreamsHeader />
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <AddRadioStationStreamButton />
                </div>
                <RadioStationStreamsTable />
            </div>
        );
    }
}

export default RadioStationStreamsView;

