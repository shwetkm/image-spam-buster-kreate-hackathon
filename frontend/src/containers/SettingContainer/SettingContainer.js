import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStringFromObject } from '../../constants/CommonUtil';
import { AI_MODEL_CLASSIFIERS, applicationContextProps } from '../../constants/constants';
import { Card, Select, Row, Col } from 'antd';
import { updateApplicationContextAction } from '../../redux/modules/applicationContext/applicatioContext-actions';


const getSelectInput = (props) => (
    <Select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        style={{ width: '100%' }}
    >
        {
            props.options.map((option) => (
                <Select.Option key={option.value} value={option.value} title={option.title}>{option.title}</Select.Option>
            ))
        }
    </Select>
);

class SettingContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChangeSetting = (language) => (value) => {
        this.props.dispatch(updateApplicationContextAction(language, value));
    };

    render() {
        const {
            language,
            learningModel,
        } = this.props;
        return (
            <Card>
                <Row>
                    <Col span={2}>Language:</Col>
                    <Col span={6}>
                        {
                            getSelectInput({
                                name: applicationContextProps.LANGUAGE,
                                value: language,
                                onChange: this.handleChangeSetting(applicationContextProps.LANGUAGE),
                                options: [
                                    { value: 'en', title: 'English' },
                                    { value: 'hi', title: 'Hindi' },
                                ],
                            })
                        }
                    </Col>
                </Row>
                <Row style={{ marginTop: '1em' }}>
                    <Col span={2}>AI Learning Model:</Col>
                    <Col span={6}>
                        {
                            getSelectInput({
                                name: applicationContextProps.LEARNING_MODEL,
                                value: learningModel,
                                onChange: this.handleChangeSetting(applicationContextProps.LEARNING_MODEL),
                                options: AI_MODEL_CLASSIFIERS,
                            })
                        }
                    </Col>
                </Row>
            </Card>
        );
    }
}

SettingContainer.propTypes = {
    language: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    console.log('vinay state', state);
    return ({
        language: getStringFromObject(applicationContextProps.LANGUAGE, state.applicationContext),
        learningModel: getStringFromObject(applicationContextProps.LEARNING_MODEL, state.applicationContext),
    });
};

export default connect(mapStateToProps)(SettingContainer);
