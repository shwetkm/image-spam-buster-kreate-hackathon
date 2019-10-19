import React from 'react';
import axios from 'axios';
import { Upload, Icon, Row, Col, Card, message } from 'antd';

class WallContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            loading: false,
            file: null,
        };
    }

    handleChangeUrl = (e) => {
        this.setState({ url: e.target.value });
    };

    handleDownloadClick = () => {
        const { loading, url } = this.state;
        if (!loading && url) {
            this.setState({ loading: true }, () => {
                this.downloadFileFromUrl(url);
            });
        }
    };

    downloadFileFromUrl = (url) => {
        axios.get(url)
            .then((response) => {
                console.log('file download', response);
                this.setState({
                    file: response.data,
                    loading: false,
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({ loading: false });
            });
    };

    onChangeFile = (info) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            this.setState({ loading: true });
        }
        if (status === 'done') {
            this.setState({ loading: false });
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            this.setState({ loading: false });
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    render() {
        const {
            url,
            file,
            loading,
        } = this.state;
        console.log('state', this.state);
        return (
            <div style={{ padding: '5em' }}>
                <Card>
                    <Row>
                        <Col span={10}>
                            <Upload.Dragger
                                listType="picture"
                                name="file"
                                multiple
                                action=""
                                onChange={this.onChangeFile}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </Upload.Dragger>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default WallContainer;
