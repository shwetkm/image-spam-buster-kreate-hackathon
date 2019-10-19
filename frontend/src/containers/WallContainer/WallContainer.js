import React from 'react';
import { Upload, Button, Icon } from 'antd';

class WallContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <Upload
                listType="picture"
            >
                <Button>
                    <Icon type="upload" /> Upload
                </Button>
            </Upload>
        );
    }
}

export default WallContainer;
