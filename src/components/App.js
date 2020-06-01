import React, { Component } from "react";
import { Layout, Menu } from 'antd';
import { Route, Link, withRouter } from "react-router-dom"

import SubscriptionList from './subscription-list.js';
import NewSubscription from './new-subscription.js';
import EditSubscription from './edit-subscription.js';

import '../styles/App.css';

class App extends Component {

    render() {
        const { Header, Footer, Sider, Content } = Layout;
        const { history } = this.props

        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }} >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" selectedKeys={[this.props.location.pathname]}>
                        <Menu.Item key="/subscriptions/all">
                            <Link to="/subscriptions/all">Subscriptions</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 580 }}>
                            <Route history={history} path='/subscriptions/all' component={SubscriptionList} />
                            <Route history={history} path='/subscriptions/edit/:id' component={EditSubscription} />
                            <Route history={history} path='/subscriptions/new' component={NewSubscription} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design Created by Nadia</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(App)