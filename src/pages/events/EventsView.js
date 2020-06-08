import React, { Component } from 'react';
import EventsTable from './EventsTable';
import { PageHeader } from 'antd';

class EventsView extends Component {

    render() {
        return (
            <div>
                <PageHeader title="Events" />
                <EventsTable />
            </div>
        );
    }
}

export default EventsView;

