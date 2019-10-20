import React from 'react';
import axios from 'axios';
import { Icon, Row, Col, Card, message, Upload, List, Progress } from 'antd';
import { formatBytes, getStringForBoolean, isObjectValidAndNotEmpty } from '../../constants/CommonUtil';

class WallContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            loading: false,
            files: [],
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
        console.log('downloading status', info);
        if (status === 'uploading') {
            this.setState({
                loading: true,
                files: info.fileList,
            });
        } else {
            this.setState({
                loading: false,
                files: info.fileList,
            });
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    getUploadStatus = (item) => {
        const { status, percent } = item;
        if (status === 'done') {
            return <span style={{ color: '#17b608' }}>Successfully uploaded</span>;
        } else if (status === 'error') {
            return <span style={{ color: 'red' }}>Failed !</span>;
        } else if (status === 'uploading') {
            return <span><Progress percent={percent} /></span>;
        }
        return '';
    };

    getContent = (item) => {
        if (item.status === 'done' && isObjectValidAndNotEmpty(item.response)) {
            const { score, predicted } = item.response;
            return (
                <Row>
                    <Col span={12}>Spam:&nbsp; {getStringForBoolean(predicted)}</Col>
                    <Col span={12}>Score:&nbsp; {score}</Col>
                </Row>
            );
        }
        return '';
    };

    render() {
        const {
            files,
        } = this.state;
        console.log('state', this.state);
        return (
            <div
                style={{ padding: '5em' }}
            >
                <Card>
                    <Row>
                        <Col span={24}>
                            <Upload.Dragger
                                accept=".jpg, .jpeg, .png"
                                listType="picture-card"
                                name="file"
                                action="/api/image_upload"
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
                <Card>
                    <Row>
                        <Col span={24}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={files}
                                renderItem={item => (
                                    <List.Item
                                        key={item.uid}
                                        extra={
                                            <img
                                                width={272}
                                                alt="logo"
                                                src={item.thumbUrl}
                                            />
                                        }
                                    >
                                        <List.Item.Meta
                                            title={
                                                <Row
                                                    justify="space-between"
                                                >
                                                    <Col span={10}>{item.name}</Col>
                                                    <Col span={14} style={{ align: 'right' }}>
                                                        {
                                                            this.getUploadStatus(item)
                                                        }
                                                    </Col>
                                                </Row>
                                            }
                                            description={
                                                <div>
                                                    <div>Size:&nbsp; {formatBytes(item.size, 2)}</div>
                                                </div>
                                            }
                                        >
                                            {this.getContent(item)}
                                        </List.Item.Meta>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default WallContainer;
