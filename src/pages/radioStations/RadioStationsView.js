import { PageHeader } from 'antd';
import React, { Component } from 'react';
import AddRadioStationButton from './addStation/AddRadioStationButton';
import ImportStationsButton from './import/ImportStationsButton';
import ExportStationsButton from './export/ExportStationsButton';
import RadioStationsTable from './RadioStationsTable';

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
                <div style={{ marginTop: 10 }}>
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

