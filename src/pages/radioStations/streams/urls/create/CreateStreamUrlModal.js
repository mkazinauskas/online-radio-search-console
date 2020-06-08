import React, { Component } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isWebUri } from 'valid-url';
import { API_URL } from '../../../../../AppConfig';
import { extractErrors } from '../../../../../utils/apiErrorUtils';

const URL_TYPES = [
    'SONGS', 'INFO'
];

const ModalForm = ({ visible, onCreate, onCancel, loading, errors }) => {

    const [form] = Form.useForm();

    if (errors.length > 0) {
        form.setFields(errors);
    }

    const typeOptions = URL_TYPES
        .map(type => <Select.Option key={type} value={type}>{type}</Select.Option>);

    return (
        <Modal
            visible={visible}
            title="Create Radio Station Stream Url"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            okButtonProps={{ disabled: loading }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onCreate(values);
                    })
                    .catch(console.debug);
            }}
        >
            <Form form={form} layout='vertical'>

                <Form.Item label="Type" name="type" rules={
                    [
                        {
                            required: true,
                            message: 'Radio station stream title required!'
                        }
                    ]
                }>
                    <Select
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        notFoundContent={null}
                        placeholder="Please select genres">
                        {typeOptions}
                    </Select>
                </Form.Item>

                <Form.Item label="URL" name="url" rules={[
                    { required: true, message: 'Please input radio station stream title!' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === value.trim()) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject('Value cannot have empty spaces around')
                            }
                        },
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (isWebUri(value)) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject('Radio station stream url is invalid')
                            }
                        }
                    }
                ]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};


const DEFAULT_STATE = {
    loading: false,
    errors: []
}

class CreateStreamUrlModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    handleSubmit = values => {
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
            .then(() => {
                message.success({ content: `Radio station stream url '${values.url}' was created` })
                this.props.onModalClose();
            })
            .catch((response) => {
                const errors = extractErrors(response)

                if (errors.length) {
                    this.setState({ ...this.state, loading: false, errors });
                } else {
                    message.error({ content: 'Failed to update radio station stream', duration: 5 });
                    this.setState({ ...this.state, loading: false });
                }
            });
    };

    render() {
        return (
            <ModalForm
                visible={this.props.visible}
                loading={this.state.loading}
                onCreate={this.handleSubmit}
                onCancel={this.props.onModalClose}
                errors={this.state.errors}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(withRouter(CreateStreamUrlModal));
