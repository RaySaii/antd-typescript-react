import * as React from 'react'
import {Card, Form, Icon, Input, Button, Checkbox, Row, Col,Spin} from 'antd';
import {hashHistory} from 'react-router';
const FormItem = Form.Item;
import './index.less';

interface LoginState{
    loading:boolean
}
class Login extends React.Component<any, LoginState> {
    constructor(){
        super();
        this.state={
            loading:false
        }
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading:true});
                setTimeout(()=>{
                    if (values.userName == 'test' && values.password == 'test') {
                        localStorage.userName = 'test';
                        hashHistory.push('/')
                    }
                    this.setState({loading:false})
                },1000)
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Spin tip="Loading..." spinning={this.state.loading}>
                <Row type="flex" style={{marginTop: 140}} justify="center">
                    <Col lg={6} md={24}>
                        <Card title="Login" className='login' bodyStyle={{paddingTop: 20}}>
                            <Form onSubmit={this.onSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{required: true, message: 'Please input your username!'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               placeholder="Username"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input  prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                               placeholder="Password"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>Remember me</Checkbox>
                                    )}
                                    <a className="login-form-forgot">Forgot password</a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    Or <a>register now!</a>
                                </FormItem>
                                <FormItem>
                                    Username:test  Password:test
                                </FormItem>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        )
    }
}
const LoginPage = Form.create()(Login);
export {LoginPage as default}

