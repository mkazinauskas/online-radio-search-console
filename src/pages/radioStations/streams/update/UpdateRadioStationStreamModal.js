import React, { Component } from 'react';
import { Modal, Form, Input, message, Switch, Select, InputNumber } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../../AppConfig';
import { extractErrors } from '../../../../utils/apiErrorUtils';

const STREAM_TYPES = [
    'MP3', 'ACC', 'MPEG', 'UNKNOWN'
];

const ModalForm = ({ visible, onCreate, onCancel, loading, errors, radioStationStream }) => {

    const [form] = Form.useForm();

    if (errors.length > 0) {
        form.setFields(errors);
    }

    const typeOptions = STREAM_TYPES
        .map(type => <Select.Option key={type} value={type}>{type}</Select.Option>);

    return (
        <Modal
            visible={visible}
            title="Update Radio Station Stream"
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
            <Form form={form}
                layout='vertical'
                initialValues={{
                    'url': radioStationStream.url,
                    'bitRate': radioStationStream.bitRate,
                    'working': radioStationStream.working,
                    'type': radioStationStream.type
                }}>
                <Form.Item label="URL" name="url" rules={
                    [
                        {
                            required: true,
                            type: 'url',
                            message: 'Please input radio station stream url!'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>
                <Form.Item label="Bit Rate" name="bitRate">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Working" name="working" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item label="Type" name="type">
                    <Select
                        showSearch
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        notFoundContent={null}
                        placeholder="Please select genres">
                        {typeOptions}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const DEFAULT_STATE = {
    loading: false,
    errors: []
}

class UpdateRadioStationStreamModal extends Component {

    state = {
        ...DEFAULT_STATE,
    }

    handleSubmit = values => {
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

        const radioStationStreamId = this.props.radioStationStream.radioStationId;

        Axios.patch(`${API_URL}/admin/radio-stations/${radioStationStreamId}/streams/${this.props.radioStationStream.id}`, content, config)
            .then(() => {
                message.success({ content: `Radio station stream '${radioStationStreamId}' was updated` })
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
                radioStationStream={this.props.radioStationStream}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(UpdateRadioStationStreamModal);
