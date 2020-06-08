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
import RadioStationsFilter from './RadioStationsFilter';

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
                record.genres.map(genre => genre.title).join(', ')
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
            id: null,
            uniqueId: null,
            enabled: null,
            title: null,
            songId: null,
            genreId: null
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

        let page = this.getParam(params, 'page', 1);
        if (page > 0) {
            page = page - 1;
        }
        const filter = {
            page,
            size: this.getParam(params, 'size', 10),
            id: this.getParam(params, 'id', null),
            uniqueId: this.getParam(params, 'uniqueId', null),
            title: this.getParam(params, 'title', null),
            enabled: this.getParam(params, 'enabled', null),
            songId: this.getParam(params, 'songId', null),
            genreId: this.getParam(params, 'genreId', null),
        };

        this.setState(
            { ...this.state, filter },
            this.loadData
        );
    }

    getParam = (params, key, defaultValue) => {
        let value = params.get(key);
        if (!value) {
            value = defaultValue;
        }
        return value;
    }

    loadData = () => {
        this.setState({ ...this.state, loading: true, error: false });

        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('sort', 'id,desc');
        urlSearchParams.set('page', this.state.filter.page);
        urlSearchParams.set('size', this.state.filter.size);
        if (this.state.filter.id) {
            urlSearchParams.set('id', this.state.filter.id);
        }
        if (this.state.filter.uniqueId) {
            urlSearchParams.set('uniqueId', this.state.filter.uniqueId);
        }
        if (this.state.filter.title) {
            urlSearchParams.set('title', this.state.filter.title);
        }
        if (this.state.filter.enabled !== null) {
            urlSearchParams.set('enabled', this.state.filter.enabled);
        }
        if (this.state.filter.songId) {
            urlSearchParams.set('songId', this.state.filter.songId);
        }
        if (this.state.filter.genreId) {
            urlSearchParams.set('genreId', this.state.filter.genreId);
        }

        Axios.get(API_URL + '/radio-stations?' + urlSearchParams.toString())
            .then((response) => {
                let data = [];

                if (response.data._embedded && response.data._embedded.radioStationResponseList) {
                    data = response.data._embedded.radioStationResponseList;
                }

                if (!data.length && response.data.page.totalPages > 1) {
                    //If last item from page deleted, we want to go back to latest existing page
                    this.redirectToPage({ ...this.state.filter, page: response.data.page.totalPages - 1, size: response.data.page.size });
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

    redirectToPage = (filter) => {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('page', filter.page + 1);
        urlSearchParams.set('size', filter.size);
        if (this.state.filter.id) {
            urlSearchParams.set('id', this.state.filter.id);
        }
        if (this.state.filter.uniqueId) {
            urlSearchParams.set('uniqueId', this.state.filter.uniqueId);
        }
        if (this.state.filter.title) {
            urlSearchParams.set('title', this.state.filter.title);
        }
        if (this.state.filter.enabled !== null) {
            urlSearchParams.set('enabled', this.state.filter.enabled);
        }
        if (this.state.filter.songId) {
            urlSearchParams.set('songId', this.state.filter.songId);
        }
        if (this.state.filter.genreId) {
            urlSearchParams.set('genreId', this.state.filter.genreId);
        }

        this.props.history.push(RADIO_STATIONS + '?' + urlSearchParams.toString());
    }

    handleTableChange = (page) => {
        this.redirectToPage({ ...this.state.filter, page: page.current - 1, size: page.pageSize });
    }

    handleFilter = (newFilters) => {
        const filters = { ...this.state.filter, page: 0 };

        if (newFilters.id) {
            filters.id = newFilters.id
        } else {
            filters.id = null;
        }

        if (newFilters.uniqueId) {
            filters.uniqueId = newFilters.uniqueId
        } else {
            filters.uniqueId = null;
        }

        if (newFilters.title) {
            filters.title = newFilters.title.trim()
        } else {
            filters.title = null;
        }

        if (newFilters.enabled) {
            filters.enabled = newFilters.enabled
        } else {
            filters.enabled = null;
        }

        if (newFilters.songId) {
            filters.songId = newFilters.songId
        } else {
            filters.songId = null;
        }

        if (newFilters.genreId) {
            filters.genreId = newFilters.genreId
        } else {
            filters.genreId = null;
        }

        this.setState({ ...this.state, filter: filters }, () => this.redirectToPage(this.state.filter))

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
            <div>
                <div style={{ marginTop: 10, marginBottom: 15 }}>
                    <RadioStationsFilter key="mine" onFinish={this.handleFilter} filters={this.state.filter} />
                </div>
                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>

        );
    }
}

export default withRouter(RadioStationsTable);