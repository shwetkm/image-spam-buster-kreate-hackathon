import React from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, Layout, Menu, Row } from 'antd';
import { getStringFromObject } from '../constants/CommonUtil';
import { addLocaleData } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import { routes } from '../constants/constants';
import getIntlFormattedMessage from '../component/IntlFormattedMessage';
import messages from '../constants/messages';

const { Header, Content, Sider } = Layout;
addLocaleData([...localeEn]);
class AppContainer extends React.Component {
  handleClickMenuItem = ({ key }) => {
    this.props.history.push(key);
  };

  getActiveItem = () => {
    const {
      location,
    } = this.props;
    const url = getStringFromObject('pathname', location);
    if (url.startsWith(routes.analytics)) {
      return routes.analytics;
    } else if (url.startsWith(routes.setting)) {
      return routes.setting;
    } else if (url.startsWith(routes.history)) {
      return routes.history;
    }
    return routes.home;
  };

  render() {
    const {
      children,
      ...otherProps
    } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
        child && React.cloneElement(child, otherProps),
    );
    console.log('AppContainer', this.getActiveItem());
    return (
        <Layout>
          <Header>
            <Row>
              <Col span={1}>
                <Icon type="home" style={{ color: 'white' }} />
              </Col>
              <Col span={2} offset={10}>
                <span style={{ color: 'white' }}>Mall91</span>
              </Col>
              <Col span={4} />
            </Row>
          </Header>
          <Content>
            <Layout>
              <Sider collapsed={false} style={{ maxHeight: '100vh', height: '100vh' }}>
                <Menu
                    selectable
                    theme="dark"
                    mode="inline"
                    selectedKeys={[this.getActiveItem()]}
                    onClick={this.handleClickMenuItem}
                >
                  <Menu.Item key={routes.home}>
                    <Icon type="cloud-upload" />
                    <span>{getIntlFormattedMessage(messages.sidebarUploadDocument)}</span>
                  </Menu.Item>
                  <Menu.Item key={routes.history}>
                    <Icon type="history" />
                    <span>History</span>
                  </Menu.Item>
                  <Menu.Item key={routes.analytics}>
                    <Icon type="pie-chart" />
                    <span>Analytics</span>
                  </Menu.Item>
                  <Menu.Item key={routes.setting}>
                    <Icon type="setting" />
                    <span>Setting</span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Content style={{ maxHeight: '100vh' }}>
                {childrenWithProps}
              </Content>
            </Layout>
          </Content>
        </Layout>
    );
  }
}

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AppContainer;
