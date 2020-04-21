import { Button, Modal } from 'antd';
import React, { Component } from 'react';

class ViewEventButton extends Component {

    showModal = () => {
        const body = JSON.stringify(JSON.parse(this.props.eventBody), 'undefined', 2);
        Modal.info({
            title: `Event with id = ${this.props.eventId}`,
            content: (
                <pre>{body}</pre>
            ),
            width: 'full',
        });
    };

    render() {
        return (
            <Button type="link" onClick={this.showModal}>
                View event
            </Button>
        );
    }
}

export default ViewEventButton;
