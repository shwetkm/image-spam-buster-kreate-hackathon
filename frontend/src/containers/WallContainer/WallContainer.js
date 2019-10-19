import React from 'react';
import axios from 'axios';
import { Upload, Button, Icon, Row, Col, Input, Card, Select } from 'antd';

class WallContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            urlPrefix: 'http://',
            loading: false,
            file: null,
        };
    }

    handleChangeUrl = (e) => {
        this.setState({ url: e.target.value });
    };

    changeUrlPrefix = (value) => {
        this.setState({ urlPrefix: value });
    };

    handleDownloadClick = () => {
        const { loading, url, urlPrefix } = this.state;
        if (!loading && url && urlPrefix) {
            const finalUrl = url + urlPrefix;
            this.setState({ loading: true }, () => {
                this.download(finalUrl);
            });
        }
    };

    downloadFileFromUrl = (url) => {
        axios.get(url)
            .then((response) => {
                console.log('file download', response);
                this.setState({
                    file: response,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        const {
            url,
            urlPrefix,
            loading,
        } = this.state;
        console.log('state', this.state);
        return (
            <div style={{ padding: '5em' }}>
                <Card>
                    <Row>
                        <Col span={6}>
                            <Input
                                value={url}
                                addonBefore={
                                    <Select style={{ width: 90 }} onChange={this.changeUrlPrefix} value={urlPrefix}>
                                        <Select.Option value="http://">http://</Select.Option>
                                        <Select.Option value="https://">https://</Select.Option>
                                    </Select>
                                }
                                addonAfter={
                                    <Button
                                        type="primary"
                                        loading={loading}
                                        onClick={this.handleDownloadClick}
                                    >
                                        Download
                                    </Button>
                                }
                                onChange={this.handleChangeUrl}
                            />
                        </Col>
                        <Col offset={1} span={1}>Or</Col>
                        <Col span={5}>
                            <Upload
                                listType="picture"
                            >
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '1em' }}>

                    </Row>
                </Card>
            </div>
        );
    }
}

export default WallContainer;
