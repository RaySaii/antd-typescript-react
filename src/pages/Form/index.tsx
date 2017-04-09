import * as React from 'react'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Card} from 'antd';
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;
const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];
interface PreFormState {
    confirmDirty: boolean
}
class PreForm extends React.Component<any, PreFormState> {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false
        }
    }

    handleSubmit = (e) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }
    checkUsed = (rule, value, callback) => {
        setTimeout(() => {
            if (value == '12345@qq.com') {
                callback('This email has been used')
            }
            else callback()
        }, 1000)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14
            }
        };

        const
            tailFormItemLayout = {
                wrapperCol: {
                    span: 14,
                    offset: 6,
                }
            };
        const
            prefixSelector = getFieldDecorator('prefix', {
                initialValue: '86',
            })(
                <Select className="icp-selector">
                    <Option value="86">+86</Option>
                </Select>
            );
        return (
            <Card className="form" bodyStyle={{marginTop: 50, marginBottom: 50}}>
                <Form onSubmit={this.handleSubmit}>
                    <p style={{paddingLeft: 240}}>(符合规则后再进行是否被使用过校验,测试邮箱12345@qq.com)</p>,
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                        hasFeedback
                    >
                        {getFieldDecorator('email', {
                            validateFirst: true,
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }, {
                                validator: this.checkUsed
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Password"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Confirm Password"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.checkPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
              Nickname&nbsp;
                                <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Habitual Residence"
                    >
                        {getFieldDecorator('residence', {
                            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                            rules: [{
                                type: 'array',
                                required: true,
                                message: 'Please select your habitual residence!'
                            }],
                        })(
                            <Cascader options={residences}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Phone Number"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: 'Please input your phone number!'}],
                        })(
                            <Input addonBefore={prefixSelector}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Captcha"
                        extra="We must make sure that your are a human."
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [{required: true, message: 'Please input the captcha you got!'}],
                                })(
                                    <Input size="large"/>
                                )}
                            </Col>
                            <Col span={12}>
                                <Button size="large">Get captcha</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I have read the <a>agreement</a></Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">Register</Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}
const FormPage = Form.create()(PreForm)
export {FormPage as default}
