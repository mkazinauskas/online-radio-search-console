import React, { Component } from 'react';
import CreateRadioStationStreamButton from './create/CreateRadioStationStreamButton';
import RadioStationStreamsHeader from './RadioStationStreamsHeader';
import RadioStationStreamsTable from './RadioStationStreamsTable';

class RadioStationStreamsView extends Component {

    render() {
        return (
            <div>
                <RadioStationStreamsHeader />
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <CreateRadioStationStreamButton />
                </div>
                <RadioStationStreamsTable />
            </div>
        );
    }
}

export default RadioStationStreamsView;

