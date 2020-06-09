import { Button, Result, Card, Row, Col, Spin } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react';
import { API_URL } from '../../AppConfig';

const Item = ({ title, statistics }) => {
    const gridStyle = {
        width: '100%',
        textAlign: 'left',
    };

    const text = Object.keys(statistics)
        .map(key => (<Card.Grid style={gridStyle} key={key}><i>{key}</i>: {statistics[key]}</Card.Grid>))
    return (
        <Col span={8} style={{ marginBottom: "10px" }}>
            <Card title={title}>
                {text}
            </Card>
        </Col>
    )
}

const Items = ({ data }) => {
    return Object.keys(data.statistics)
        .map(key => (<Item statistics={data.statistics[key]} key={key} title={key} />))
}

class StatisticsTable extends Component {

    state = {
        data: {},
        error: false,
        loading: true,
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({ ...this.state, loading: true, error: false });

        Axios.get(API_URL + '/statistics')
            .then(({ data }) => {
                this.setState({ ...this.state, data });
            })
            .catch(() => { this.setState({ ...this.state, error: true }) })
            .then(() => this.setState({ ...this.state, loading: false }));
    }

    render() {
        if (this.state.loading) {
            return (
                <Spin>
                    <Row gutter={16}>
                    </Row>
                </Spin>
            );
        }
        if (this.state.error) {
            return (
                <Result
                    status="error"
                    title="Failed to load statistics"
                    subTitle="Please wait until service will be working again"
                    extra={[
                        <Button type="primary" key="console" onClick={this.loadData}>Retry</Button>,
                    ]}
                >
                </Result>
            );
        }
        return (
            <Row gutter={16}>
                <Items data={this.state.data} />
            </Row>
        );
    }
}

export default StatisticsTable;