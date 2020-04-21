import React, { Component } from 'react';
import RadioStationsTable from './RadioStationsTable';
import AddRadioStationButton from './addStation/AddRadioStationButton';
import { PageHeader } from 'antd';

class RadioStationsView extends Component {

    render() {
        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Radio stations"
                />
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <AddRadioStationButton />
                </div>
                <RadioStationsTable />
            </div>
        );
    }
}

export default RadioStationsView;

