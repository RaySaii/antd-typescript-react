import * as React from 'react'
import {Spin} from 'antd'

export default function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component<any,any>{
        state={
            Component:null
        }
        componentWillMount() {
        	if(!this.state.Component){
        	    getComponent().then(module => module.default).then(Component=>{
        	        this.setState({Component})
                })
            }
        }
        render(){
            return this.state.Component?<this.state.Component {...this.props}/>:<div style={{width:'100%',minHeight:'360px',marginTop:'170px',textAlign:'center'}}><Spin size="large" /></div>
        }
    }
}
