import * as React from 'react';
import NumberCard from './components/NumberCard';
import TodoList from './components/TodoList'
import Sales from './components/Sales';
import Weather from './components/Weather';
import Quote from './components/Quote';
import {Col, Row, Card} from 'antd';
import {observer} from 'mobx-react';

interface HomePageState {
}
@observer
export default class HomePage extends React.Component<void, HomePageState> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        const number = [
            {
                icon: 'pay-circle-o',
                color: 'green',
                title: 'Online Review',
                end: 2781,
            }, {
                icon: 'team',
                color: 'blue',
                title: 'New Customers',
                end: 3241,
            }, {
                icon: 'message',
                color: 'purple',
                title: 'Active Projects',
                end: 253,
            }, {
                icon: 'shopping-cart',
                color: 'red',
                title: 'Referrals',
                end: 4324,
            },

        ];
        let numberCard = number.map((item, key) => {
            return (
                <Col key={key} lg={6} md={12}>
                    <NumberCard {...item}/>
                </Col>
            );
        });
        return (
            <Row gutter={24}>
                {numberCard}
                <Col lg={18} md={24}>
                    <Card bordered={false} bodyStyle={{
                        padding: '24px 36px 24px 0',
                    }}>
                        <Sales/>
                    </Card>
                </Col>
                <Col lg={6} md={24}>
                    <Row gutter={24}>
                        <Col lg={24} md={12}>
                            <Card bordered={false} className="weather" bodyStyle={{
                                width: '100%',
                                padding: 0,
                                height: 204,
                                background: '#8BD0FF',
                            }}>
                                <Weather/>
                            </Card>
                        </Col>
                        <Col lg={24} md={12}>
                            <Card bordered={false} className='quote' bodyStyle={{
                                padding: 0,
                                height: 204,
                            }}>
                                <Quote/>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col lg={24} md={12}>
                    <TodoList/>
                </Col>
            </Row>
        );
    }
}
