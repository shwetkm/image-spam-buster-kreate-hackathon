import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, Col, Icon, List, message, Progress, Row, Select, Upload } from 'antd';
import { formatBytes, getStringForBoolean, getStringFromObject } from '../../constants/CommonUtil';
import { AI_MODEL_CLASSIFIERS, applicationContextProps } from '../../constants/constants';

class WallContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            loading: false,
            files: [],
            selectedClassifier: props.classifier,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.classifier !== prevProps.classifier) {
            this.setState({ selectedClassifier: this.props.classifier });
        }
    }

    handleChangeUrl = (e) => {
        this.setState({ url: e.target.value });
    };

    onChangeClassifier = (value) => {
        this.setState({ selectedClassifier: value });
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
        console.log('ankit', item);
        if (item.status === 'done') {
            const score = getStringFromObject('response.score', item);
            const predicted = getStringFromObject('response.predicted', item);
            return (
                <React.Fragment>
                    <Row>
                        <Col span={12}><h3>Size:&nbsp; {formatBytes(item.size, 2)}</h3></Col>
                    </Row>
                    <Row style={{ marginTop: '1em' }}>
                        <Col span={12}><h3>Spam:&nbsp; {getStringForBoolean(predicted)}</h3></Col>
                    </Row>
                    <Row style={{ marginTop: '1em' }}>
                        <Col span={12}><h3>Score:&nbsp; {score}</h3></Col>
                    </Row>
                </React.Fragment>
            );
        }
        return '';
    };

    render() {
        const {
            files,
            selectedClassifier,
        } = this.state;
        console.log('state', this.state);
        let api = '/api/image_upload';
        if (selectedClassifier) {
            api = `${api}?model=${selectedClassifier}`;
        }
        return (
            <div
                style={{ padding: '5em' }}
            >
                <Card>
                    <Row>
                        <Col span={3}>Select AI Learning Model: </Col>
                        <Col span={10}>
                            <Select
                                value={selectedClassifier}
                                onChange={this.onChangeClassifier}
                                style={{ width: '100%' }}
                            >
                                {
                                    AI_MODEL_CLASSIFIERS.map((option) => (
                                        <Select.Option key={option.value} value={option.value} title={option.title}>{option.title}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '1em' }}>
                        <Col span={24}>
                            <Upload.Dragger
                                accept=".jpg, .jpeg, .png"
                                listType="picture-card"
                                name="file"
                                action={api}
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
                                                    <Col span={10}><h2>{item.name}</h2></Col>
                                                    <Col span={14} style={{ align: 'right' }}>
                                                        {
                                                            this.getUploadStatus(item)
                                                        }
                                                    </Col>
                                                </Row>
                                            }
                                            description={
                                                this.getContent(item)
                                            }
                                        />
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

const mapStateToProps = state => ({
    classifier: getStringFromObject(applicationContextProps.LEARNING_MODEL, state.applicationContext),
});

export default connect(mapStateToProps)(WallContainer);
