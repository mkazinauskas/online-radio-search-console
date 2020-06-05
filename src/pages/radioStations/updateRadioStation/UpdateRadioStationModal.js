import React, { Component } from 'react';
import { Modal, Form, Input, Switch, Select, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../AppConfig';
import { extractErrors } from '../../../utils/apiErrorUtils';

const ModalForm = ({ visible, radioStation, genres, onSubmit, onCancel, onGenreSearch, loading, errors }) => {

    const [form] = Form.useForm();

    if (errors.length > 0) {
        form.setFields(errors);
    }

    const genreOptions = genres
        .map(genre => <Select.Option key={genre.id} value={genre.id}>{genre.title}</Select.Option>);

    return (
        <Modal
            visible={visible}
            title="Update Radio Station"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            okButtonProps={{ disabled: loading }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onSubmit(values);
                    })
                    .catch(() => { });
            }}
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                initialValues={{
                    'title': radioStation.title,
                    'website': radioStation.website,
                    'enabled': radioStation.enabled,
                }}
            >
                <Form.Item label="Title" name="title" rules={
                    [
                        {
                            required: true,
                            message: 'Please input radio station title!'
                        },
                        {
                            max: 100,
                            message: 'Title too long! (Max 100)'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Website" name="website" rules={
                    [
                        {
                            required: false,
                            type: 'url',
                            message: 'Please input radio station website!'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Enabled" name="enabled" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item label="Genres" name="genres" >
                    <Select
                        showSearch
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        onSearch={onGenreSearch}
                        filterOption={false}
                        mode="multiple"
                        notFoundContent={null}
                        placeholder="Please select genres">
                        {genreOptions}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const DEFAULT_STATE = {
    genres: [],
    loading: false,
    errors: []
}

class UpdateRadioStationModal extends Component {

    state = {
        ...DEFAULT_STATE,
        genres: this.props.radioStation.genres
    }

    onSubmit = values => {
        this.setState({ loading: true });
        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }

        let content = {
            title: values.title,
            website: values.website,
            enabled: values.enabled,
            genres: values.genres ? values.genres.map(id => { return { id } }) : []
        }

        Axios.patch(`${API_URL}/admin/radio-stations/${this.props.radioStation.id}`, content, config)
            .then(() => {
                message.success({ content: `Radio station '${values.title}' was updated`, duration: 5 });
                this.props.onModalClose();
            })
            .catch((response) => {
                const errors = extractErrors(response)

                if (errors.length) {
                    this.setState({ ...this.state, loading: false, errors });
                } else {
                    message.error({ content: `Failed to update radio station '${values.title}'`, duration: 5 });
                    this.setState({ ...this.state, loading: false });
                }
            });
    }


    onGenreSearch = value => {
        if (value && value.length > 3) {
            Axios.get(`${API_URL}/search/genre/?title=${value}`)
                .then((result) => {
                    this.setState({ ...this.state, genres: result.data._embedded.searchGenreResultResponseList });
                })
                .catch(({ response }) => {
                    // debugger;
                    // const { data } = response;

                    this.setState({ ...this.state, genres: [] });
                });
        } else {
            this.setState({ genres: [] });
        }
    }

    render() {
        return (
            <ModalForm
                visible={this.props.visible}
                loading={this.state.loading}
                onSubmit={this.onSubmit}
                onGenreSearch={this.onGenreSearch}
                genres={this.state.genres}
                radioStation={this.props.radioStation}
                onCancel={this.props.onModalClose}
                errors={this.state.errors}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(UpdateRadioStationModal);
