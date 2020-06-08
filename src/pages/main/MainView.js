import React, { Component } from 'react';
import StatisticsTable from './StatisticsTable';
import { PageHeader } from 'antd';

class MainView extends Component {

    render() {
        return (
            <div>
                <PageHeader title="Statistics" />
                <StatisticsTable />
            </div >
        );
    }
}

export default MainView;
