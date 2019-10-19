import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AppContainer.css';

const { Header, Content, Footer } = Layout;

class AppContainer extends React.PureComponent {
    render() {
        const {
            children,
        } = this.props;
        return (
            <Layout className="layout">
                <Header>
                    <Icon type="home" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">Wall</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    {...children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.node,
};

AppContainer.defaultProps = {
    children: null,
};

const mapStateToProps = () => ({});

export default (withRouter(connect(mapStateToProps)(AppContainer)));
