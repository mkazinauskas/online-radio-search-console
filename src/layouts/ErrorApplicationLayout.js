import React from 'react';
import { Result, Button } from 'antd';

export default () => {
    return (
        <Result
            status="error"
            title="Failed to load application"
            subTitle="Please check network connection to background authentication services."
            extra={[
                <Button type="primary" key="console" href="/">Retry</Button>
            ]}
        >
        </Result>
    )
};