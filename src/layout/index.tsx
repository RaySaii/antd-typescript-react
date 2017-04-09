import * as React from 'react'
import {Icon, Layout as ILayout,Menu} from 'antd';
import Bread from './Bread';
const {Header, Footer, Sider, Content} = ILayout;
import {hashHistory} from 'react-router';
import './index.less';
const SubMenu=Menu.SubMenu
import Nav from './Nav';

import Store from './index.store';
import {observer} from "mobx-react";

interface AppState {
    collapsed: boolean;
}
@observer
class Layout extends React.Component<any, AppState> {
    constructor(props) {
        super(props);
    }
    logout=()=>{
        localStorage.removeItem('userName');
        hashHistory.push('/login')
    }
    render() {
        return (
            <ILayout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={Store.collapsed}
                    className={Store.collapsed ? 'collapsed' : ''}
                >
                    <Nav/>
                </Sider>
                <ILayout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={Store.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={Store.toggleCollapsed}
                        />
                        <div className='rightWraper'>
                            <Menu mode="horizontal" className="menu">
                                <SubMenu style={{
                                    float: 'right',
                                }} title={< span > <Icon type="user"/>{localStorage.userName}</span>}
                                >
                                    <Menu.Item key="logout">
                                        <a onClick={this.logout}>注销</a>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                    </Header>
                    <Bread routes={this.props.routes}/>
                    <Content >
                        <div style={{padding: 24, minHeight: 360}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        TS+REACT ©2017 Created by Blackbird
                    </Footer>
                </ILayout>
            </ILayout>
        )
    }
}
export default Layout
