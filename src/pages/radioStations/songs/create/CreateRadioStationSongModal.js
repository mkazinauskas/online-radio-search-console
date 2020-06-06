import { message, DatePicker, Form, Input, Modal, TimePicker } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_URL } from '../../../../AppConfig';
import { extractErrors } from '../../../../utils/apiErrorUtils';
import { withRouter } from 'react-router';

const ModalForm = ({ visible, onCreate, onCancel, loading, errors }) => {

    const [form] = Form.useForm();

    if (errors.length > 0) {
        form.setFields(errors);
    }

    return (
        <Modal
            visible={visible}
            title="Create New Radio Station Song"
            okText="Create"
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
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
                <Form.Item label="Song Id" name='songId' rules={[
                    {
                        required: true,
                        message: 'Please input song id!'
                    }
                ]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Date" name='date' rules={[
                    {
                        type: 'object',
                        required: true,
                        message: 'Please select date!'
                    }
                ]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Time" name="time" rules={[
                    {
                        type: 'object',
                        required: true,
                        message: 'Please select time!'
                    }
                ]}>
                    <TimePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const DEFAULT_STATE = {
    loading: false,
    errors: []
}

class CreateRadioStationSongModal extends Component {

    state = {
        ...DEFAULT_STATE
    }

    handleSubmit = values => {
        this.setState({ loading: true, errors: [] });
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
            .then(() => {
                message.success({ content: `Radio station song was created successfuly` })
                this.props.onModalClose();
            })
            .catch((response) => {
                const errors = extractErrors(response)

                if (errors.length) {
                    this.setState({ ...this.state, loading: false, errors });
                } else {
                    message.error({ content: 'Failed to create radio station played song', duration: 5 });
                    this.setState({ ...this.state, loading: false });
                }
            })
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

export default connect(mapStateToProps)(withRouter(CreateRadioStationSongModal));
