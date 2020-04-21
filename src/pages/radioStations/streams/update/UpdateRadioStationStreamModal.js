import React, { Component } from 'react';
import { Modal, Form, Input, Alert, Switch, Select } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../../AppConfig';

const STREAM_TYPES = [
    'MP3', 'ACC', 'MPEG', 'UNKNOWN'
];

const DEFAULT_STATE = {
    loading: false,
    successMessage: null,
    errorMessage: null
}

class UpdateRadioStationStreamModal extends Component {

    state = {
        ...DEFAULT_STATE,
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

                let content = {
                    url: values.url,
                    bitRate: values.bitRate,
                    working: values.working,
                    type: values.type
                }
                Axios.patch(`${API_URL}/admin/radio-stations/${this.props.radioStationStream.radioStationId}/streams/${this.props.radioStationStream.id}`, content, config)
                    .then(() => this.setState({ ...this.state, successMessage: 'Radio station stream was updated' }))
                    .catch(() => this.setState({ ...this.state, errorMessage: 'Failed to update radio station stream' }))
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
        const radioStationStream = this.props.radioStationStream;

        const typeOptions = STREAM_TYPES
            .map(type => <Select.Option key={type} value={type}>{type}</Select.Option>);

        const form = (
            <Form
                layout='vertical'
                onSubmit={this.handleSubmit}
            >
                <Form.Item label="URL">
                    {getFieldDecorator('url', {
                        initialValue: radioStationStream.url,
                        rules: [{ required: true, type: 'url', message: 'Please input radio station stream url!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Bit Rate">
                    {getFieldDecorator('bitRate', {
                        initialValue: radioStationStream.bitRate,
                        rules: [{ required: true, message: 'Please input radio station stream bit rate!' }],
                    })(<Input type='number' />)}
                </Form.Item>
                <Form.Item label="Working">
                    {getFieldDecorator('working', {
                        initialValue: radioStationStream.working,
                        valuePropName: 'checked',
                    })(<Switch />)}
                </Form.Item>
                <Form.Item label="Type">
                    {getFieldDecorator('type', {
                        initialValue: radioStationStream.type,
                        rules: [{ required: true }]
                    })(
                        <Select
                            showSearch
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            onSearch={this.handleSearch}
                            filterOption={false}
                            notFoundContent={null}
                            placeholder="Please select genres">
                            {typeOptions}
                        </Select>
                    )}
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
                    title="Update Radio Station Stream"
                    visible={this.props.visible}
                    okText="Update"
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

const form = Form.create({ name: 'coordinated' })(UpdateRadioStationStreamModal)

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(form);
