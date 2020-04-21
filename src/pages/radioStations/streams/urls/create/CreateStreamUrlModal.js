import React, { Component } from 'react';
import { Modal, Form, Input, Alert, Select } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isWebUri } from 'valid-url';
import { API_URL } from '../../../../../AppConfig';

const URL_TYPES = [
    'SONGS', 'INFO'
];

const DEFAULT_STATE = {
    loading: false,
    successMessage: null,
    errorMessage: null
}

class CreateStreamUrlModal extends Component {

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

                const content = {
                    ...values
                }

                const radioStationId = this.props.match.params.radioStationId;
                const streamId = this.props.match.params.streamId;

                Axios.post(`${API_URL}/admin/radio-stations/${radioStationId}/streams/${streamId}/urls`, content, config)
                    .then(() => this.setState({ ...this.state, successMessage: 'Radio station stream url was added' }))
                    .catch(() => this.setState({ ...this.state, errorMessage: 'Failed to add stream url' }))
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


        const typeOptions = URL_TYPES
            .map(type => <Select.Option key={type} value={type}>{type}</Select.Option>);

        const form = (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Type">
                    {getFieldDecorator('type')(
                        <Select
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
                <Form.Item label="URL">
                    {getFieldDecorator('url', {
                        rules: [
                            { required: true, message: 'Please input radio station stream title!' },
                            {
                                validator: (rule, value, callback) => {
                                    if (value === value.trim()) {
                                        callback();
                                    } else {
                                        callback(false);
                                    }
                                },
                                message: 'Value cannot have empty spaces around',
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (isWebUri(value)) {
                                        callback();
                                    } else {
                                        callback(false);
                                    }
                                },
                                message: 'Radio station stream url is invalid',
                            },

                        ],
                    })(<Input />)}
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
                    title="Add New Radio Station Stream"
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

const form = Form.create({ name: 'coordinated' })(withRouter(CreateStreamUrlModal))

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(form);
