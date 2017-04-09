import * as React from 'react'
import {Row, Card, Input, Dropdown, Menu} from 'antd'
import * as fetchJsonp from 'fetch-jsonp';
interface SearchState {
    value: string
    data: any[]
}
export default class Search extends React.Component<void, SearchState> {
    private curValue: string;
    private timeout: any

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            data: []
        }
    }

    fetch(val: string, callback = a => a) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.curValue = val;
        const fake = () => {
            fetchJsonp(`https://suggest.taobao.com/sug?q=${val}`).then(res => res.json()).then(res => {
                if (this.curValue == val) {
                    let data: any[];
                    data = res['result'].map(item => {
                        return {value: item[0], text: item[0]}
                    })
                    callback(data)
                }
            })
        }
        this.timeout = setTimeout(() => fake(), 300)
    }

    handleValueChange(value) {
        this.setState({value})
        this.fetch(value, data => this.setState({data}))
    }

    onMenuClick(e: any) {
        console.log(e.key)
        this.setState({value: e.key})
    }

    render() {
        const options = (
            <Menu onClick={e => this.onMenuClick(e)}>
                {this.state.data.map(item => <Menu.Item key={item.value}>{item.text}</Menu.Item>)}
            </Menu>
        )
        return (
            <Card>
                <Row type='flex' justify="center">
                    <Dropdown trigger={['click']} overlay={options}>
                        <Input value={this.state.value} placeholder="input search text" style={{width: '60%'}}
                               onChange={e => this.handleValueChange(e.target['value'])}/>
                    </Dropdown>
                </Row>
            </Card>
        )
    }
}
