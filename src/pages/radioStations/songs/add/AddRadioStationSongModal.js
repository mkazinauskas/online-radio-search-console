import { Alert, DatePicker, Form, Input, Modal, TimePicker } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { API_URL } from '../../../../AppConfig';

const DEFAULT_STATE = {
    loading: false,
    successMessage: null,
    errorMessage: null
}

class AddRadioStationSongModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true, successMessage: null, errorMessage: null });
                const config = {
                    headers: {
                        Authorization: `Bearer ${this.props.token}`
                    }
                }

                const mergedDateWithTime = values.date;
                mergedDateWithTime.set({
                    hour: values.time.get('hour'),
                    minute: values.time.get('minute'),
                    second: values.time.get('second'),
                    mili: values.time.get('second')
                });
                const playedTime = mergedDateWithTime.format('YYYY-MM-DDTHH:mm:ssZ');
                const content = {
                    songId: values.songId,
                    playedTime
                }

                const radioStationId = this.props.match.params.radioStationId;

                Axios.post(`${API_URL}/admin/radio-stations/${radioStationId}/songs`, content, config)
                    .then(() => this.setState({ ...this.state, successMessage: 'Radio station song was added' }))
                    .catch(() => this.setState({ ...this.state, errorMessage: 'Failed to add played song' }))
                    .then(() => this.setState({ ...this.state, loading: false }));
            }
        });
    };

    onCancel = () => {
        this.props.form.resetFields();
        this.props.onModalClose();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const form = (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Song Id">
                    {getFieldDecorator('songId', {
                        rules: [
                            { required: true, message: 'Please input song id!' },
                        ],
                    })(<Input type="number" />)}
                </Form.Item>
                <Form.Item label="Date">
                    {getFieldDecorator('date', {
                        rules: [{ type: 'object', required: true, message: 'Please select date!' }],
                    })(<DatePicker />)}
                </Form.Item>
                <Form.Item label="Time">
                    {getFieldDecorator('time', {
                        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                    })(<TimePicker />)}
                </Form.Item>
            </Form>
        );

        const successMessage = this.state.successMessage
            ? (<Alert message={this.state.successMessage} showIcon type="success" />)
            : '';

        const errorMessage = this.state.errorMessage
            ? (<Alert message={this.state.errorMessage} showIcon type="error" />)
            : '';
        return (
            <span>
                <Modal
                    title="Add New Radio Station Song"
                    visible={this.props.visible}
                    okText="Add"
                    okButtonProps={{ disabled: this.state.loading }}
                    onOk={this.handleSubmit}
                    onCancel={this.onCancel}
                >
                    <div style={{ marginBottom: 10 }}>
                        {successMessage}
                        {errorMessage}
                    </div>
                    {form}
                </Modal>
            </span>
        );
    }
}

const form = Form.create({ name: 'coordinated' })(withRouter(AddRadioStationSongModal))

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(form);
