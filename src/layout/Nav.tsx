import * as React from 'react';
import Store from './index.store'
import {Menu, Icon} from 'antd';
import {observer} from "mobx-react";
import {Link}from 'react-router';
const SubMenu = Menu.SubMenu;
@observer
export default class Nav extends React.Component<void, void> {
    constructor(props) {
        super(props);
    }

    makeMenu(menu, top :boolean= true,path:string='/') {
        return menu.map(item => {
            if (item.child) {
                path=top?item.key+'/':path+item.key+'/';
                return (
                    <SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon}/> : ''}<span
                        className={top ? 'coll-nav-text' : ''}>{item.name}</span></span>}>
                        {this.makeMenu(item['child'], false,path)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item>
                        <Link to={path+item.key}>
                            {item.icon ? <Icon type={item.icon}></Icon> : ''}
                            <span className={top ? 'coll-nav-text' : ''}>{item.name}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }

    render() {
        let menu = this.makeMenu(Store.preMenu)
        return (
            <div>
                <div className="logo">
                    <img alt='logo' src='https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg'/>
                    <span>ANTD ADMIN</span>
                </div>
                <Menu theme="dark" mode={Store.collapsed ? 'vertical' : 'inline'} defaultSelectedKeys={['4']}>
                    {menu}
                </Menu>
            </div>
        );
    }
}
