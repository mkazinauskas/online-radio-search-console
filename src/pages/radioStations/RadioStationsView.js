import { PageHeader } from 'antd';
import React, { Component } from 'react';
import AddRadioStationButton from './createRadioStation/CreateRadioStationButton';
import ImportStationsButton from './import/ImportStationsButton';
import ExportStationsButton from './export/ExportStationsButton';
import RadioStationsTable from './RadioStationsTable';

class RadioStationsView extends Component {

    render() {
        return (
            <div>
                <PageHeader
                    title="Radio stations"
                />
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <span>
                        <AddRadioStationButton />
                    </span>
                    <span style={{ marginLeft: 10 }}>
                        <ImportStationsButton />
                    </span>
                    <span style={{ marginLeft: 10 }}>
                        <ExportStationsButton />
                    </span> 
                </div>
                <RadioStationsTable />
            </div >
        );
    }
}

export default RadioStationsView;

