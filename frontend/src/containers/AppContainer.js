import React from 'react';
import { Col, Icon, Layout, Menu, Row } from 'antd';

const { Header, Content, Sider } = Layout;

class AppContainer extends React.Component {
  handleClickMenuItem = ({ key }) => {
    this.props.history.push(key);
  };

  render() {
    const {
      children,
      ...otherProps
    } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
        child && React.cloneElement(child, otherProps),
    );
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
              <Sider collapsed={false} style={{ height: '100vh' }}>
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={this.handleClickMenuItem}
                >
                  <Menu.Item key="/home">
                    <Icon type="cloud-upload" />
                    <span>Upload Image</span>
                  </Menu.Item>
                  <Menu.Item key="/history">
                    <Icon type="history" />
                    <span>History</span>
                  </Menu.Item>
                  <Menu.Item key="/analytics">
                    <Icon type="pie-chart" />
                    <span>Analytics</span>
                  </Menu.Item>
                  <Menu.Item key="/setting">
                    <Icon type="setting" />
                    <span>Setting</span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Content>
                {childrenWithProps}
              </Content>
            </Layout>
          </Content>
        </Layout>
    );
  }
}

export default AppContainer;
