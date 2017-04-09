import * as React from 'react'
import {Breadcrumb, Icon} from 'antd'
import Store from './index.store';
import './Bread.less'

interface BreadProps {
    routes: any[]
}
class Bread extends React.Component<BreadProps, void> {
    getPathName = (path: string, pre: any, res: any) => {
        pre.map(ele => {
            if (ele.key == path) {
                res = {icon: ele.icon, name: ele.name}
            } else {
                if (ele['child']) res = this.getPathName(path, ele['child'], res);
            }
        })
        return res
    }

    render() {
        return (
            <div className='bread'>
                <Breadcrumb>
                    {this.props.routes.map(item => {
                        let res: any = {};
                        res = this.getPathName(item.path, Store.preMenu, res)
                        return (
                            <Breadcrumb.Item>
                                {item.path !== '/' ?
                                    [<Icon type={res.icon}/>, <span>{res.name}</span>] :
                                    [<Icon type='home'/>, <span>主页</span>]
                                }
                            </Breadcrumb.Item>
                        )
                    })}
                </Breadcrumb>
            </div>
        )
    }
}
export {Bread as default}
