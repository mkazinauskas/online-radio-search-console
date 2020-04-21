import { Button, Result, Table } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { RADIO_STATIONS } from '../../layouts/pathTypes';
import DeleteRadioStationButton from './deleteStation/DeleteRadioStationButton';
import ShowRadioStationSongsButton from './songs/ShowRadioStationSongsButton';
import ShowRadioStationStreamsButton from './streams/ShowRadioStationStreamsButton';
import UpdateRadioStationButton from './updateRadioStation/UpdateRadioStationButton';
import { API_URL } from './../../AppConfig';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Unique Id',
        dataIndex: 'uniqueId',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Website',
        dataIndex: 'website',
    },
    {
        title: 'Enabled',
        dataIndex: 'enabled',
        render: (text, record) => {
            return (
                record.enabled ? 'Yes' : 'No'
            );
        }
    },
    {
        title: 'Genres',
        dataIndex: 'genres',
        render: (text, record) => {
            return (
                record.genres.map(genre => genre.title).join(',')
            );
        }
    },
    {
        title: 'Actions',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
            const id = record.id;
            return (
                <span>
                    <span style={{ padding: 15 }}>
                        <ShowRadioStationSongsButton key={`songs-${id}`} id={id} style={{ padding: 10 }} />
                    </span>
                    <span style={{ padding: 15 }}>
                        <ShowRadioStationStreamsButton key={`streams-${id}`} id={id} />
                    </span>
                    <UpdateRadioStationButton key={`update-radio-station-${id}`} radioStation={record} />
                    <DeleteRadioStationButton key={`delete-${id}`} id={id} />
                </span>
            )
        },
    }
];

class RadioStationsTable extends Component {

    state = {
        data: [],
        pagination: {
            total: null,
            pageSize: null,
            current: null
        },
        filter: {
            page: 0,
            size: 10,
        },
        error: false,
        loading: true,
    };

    componentDidMount() {
        this.loadDataWithSearchParams();
        this.unregisterHistoryListener = this.props.history.listen(() => {
            this.loadDataWithSearchParams();
        });
    }

    componentWillUnmount() {
        this.unregisterHistoryListener();
    }

    loadDataWithSearchParams = () => {
        const params = new URLSearchParams(this.props.history.location.search);

        let page = params.get('page');
        if (!page) {
            page = 1;
        }

        let size = params.get('size');
        if (!size) {
            size = 10;
        }

        const filter = {
            page: page - 1,
            size,
        };

        this.setState(
            { ...this.state, filter },
            this.loadData
        );
    }

    loadData = () => {
        this.setState({ ...this.state, loading: true, error: false });

        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('sort', 'id,desc');
        urlSearchParams.set('page', this.state.filter.page);
        urlSearchParams.set('size', this.state.filter.size);

        Axios.get(API_URL + '/radio-stations?' + urlSearchParams.toString())
            .then((response) => {
                let data = [];

                if (response.data._embedded && response.data._embedded.radioStationResponseList) {
                    data = response.data._embedded.radioStationResponseList;
                }

                if (!data.length && response.data.page.totalPages > 1) {
                    //If last item from page deleted, we want to go back to latest existing page
                    this.redirectToPage(response.data.page.totalPages, response.data.page.size);
                }

                this.setState({
                    ...this.state,
                    data,
                    pagination: {
                        total: response.data.page.totalElements,
                        pageSize: response.data.page.size,
                        current: response.data.page.number + 1
                    }
                })

            })
            .catch(() => { this.setState({ ...this.state, error: true }) })
            .then(() => this.setState({ ...this.state, loading: false }));
    }

    redirectToPage = (page, size) => {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('page', page);
        urlSearchParams.set('size', size);

        this.props.history.push(RADIO_STATIONS + '?' + urlSearchParams.toString());
    }

    handleTableChange = (page) => {
        this.redirectToPage(page.current, page.pageSize);
    }

    render() {
        if (this.state.error) {
            return (
                <Result
                    status="error"
                    title="Failed to load radio stations"
                    subTitle="Please wait until service will be working again"
                    extra={[
                        <Button type="primary" key="console" onClick={this.loadData}>Retry</Button>,
                    ]}
                >
                </Result>
            );
        }
        return (
            <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        );
    }
}

export default withRouter(RadioStationsTable);