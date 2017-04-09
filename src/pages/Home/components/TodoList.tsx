import * as React from 'react'
import {Calendar, Card, Table, Row, Col, Input, Popconfirm, Button,message} from 'antd';
import './TodoList.less';
import * as moment from 'moment';
import * as _ from 'lodash';
interface TodoListState {
    selectedRowKeys: any[]
    cache: string
    curDate: string
    curData: any[]
    data: object
}
export default class TodoList extends React.Component<void, TodoListState> {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            cache: '',
            curDate: '',
            curData: [],
            data: {}
        }
    }

    componentWillMount() {
        let {data, curData, curDate} = this.state;
        data = {
            [moment().format('YYYY-MM-DD')]: [
                {content: 'Make the theme responsive '},
                {content: 'Let theme shine like a star '},
                {content: 'Design a nice theme '},
                {content: 'Check your messages and notifications'},
                {content: 'Let theme shine like a star'},
            ]
        }
        curDate = moment().format('YYYY-MM-DD')
        curData = data[curDate];
        this.setState({data, curData, curDate})
    }
    checkDone(){
        let {curData,selectedRowKeys}=this.state;
        selectedRowKeys.length = 0;
        curData.map((item, index) => {
            item.done && selectedRowKeys.push(index.toString());
        })
        this.setState({selectedRowKeys})
    }
    onSelectChange = (selectedRowKeys: string[], selectRows: any) => {
        let {cache, curData} = this.state;
        curData.map(item => delete item.done)
        selectedRowKeys.map(item => {
            if (curData[item].edit) {
                curData[item].content = cache;
                delete curData[item].edit;
            }
            curData[item].done = true;
        })
        this.setState({selectedRowKeys, curData});
    }


    edit(index: number, record: any) {
        let {cache, curData} = this.state;
        curData.map(item => {
            item.edit && (item.content = cache);
            delete item.edit;
        })
        curData[index].edit = true;
        cache = curData[index]['content'];
        this.setState({cache, curData});
    }

    handleValueChange(e: any, index: number) {
        let {curData} = this.state;
        curData[index]['content'] = e.target.value;
        this.setState({curData})
    }

    Save(index) {
        let {cache, curData} = this.state;
        if(curData[index].content==''){
            message.warn('不能为空')
            return ;
        }
        cache = '';
        delete curData[index]['add'];
        delete curData[index]['edit'];
        console.log(curData[index])
        this.setState({cache, curData});
    }

    delete(index: number) {
        let {curData, curDate, data} = this.state;
        curData.splice(index, 1);
        data[curDate] = curData;
        this.setState({curData, data},()=>this.checkDone())
    }

    add() {
        let {curData, data, curDate} = this.state;
        curData = _.toArray(curData);
        curData.unshift({content: '', add: true});
        data[curDate] = curData;
        this.setState({curData, data},()=>this.checkDone())
    }

    Cancel(index: number) {
        let {curData} = this.state;
        curData.splice(index, 1);
        this.setState({curData},()=>this.checkDone())
    }

    dateCellRender(date: any) {
        let {data} = this.state;
        if (_.isEmpty(data[date.format('YYYY-MM-DD')]))return '';
        return (
            <div style={{
                width: 6,
                height: 6,
                margin: '0 auto',
                marginTop: '2px',
                borderRadius: '50%',
                background: '#F2A790'
            }}></div>
        )
    }

    onPanelChange(date: any) {
        this.onDateSelect(date)
    }

    onDateSelect(date: any) {
        let {curDate, data, curData} = this.state;
        data[curDate] = curData;
        curDate = date.format('YYYY-MM-DD');
        curData = _.toArray(data[curDate]);
        this.setState({curDate, data, curData})
    }

    render() {
        let {selectedRowKeys, curData} = this.state;
        const columns = [
            {
                title: 'content',
                dataIndex: 'content',
                width: '80%',
                className: 'content',
                render: (text, record, index) => {
                    return (
                        record.done && !record.add ?
                            <div style={{
                                color: '#999999',
                                textDecoration: 'line-through'
                            }}>{text}</div> : ( record.edit || record.add ?
                            <Input value={curData[index]['content']}
                                   onChange={e => this.handleValueChange(e, index)}/> : text)
                    )
                }
            },
            {
                title: 'operate',
                dataIndex: 'operate',
                width: '20%',
                className: 'operate',
                render: (text, record, index) => {
                    if (record.add) {
                        return (
                            <div style={{color: '#108EE9', cursor: 'pointer'}}>
                                <span onClick={() => this.Save(index)}>Save&nbsp;&nbsp;</span>
                                <span onClick={() => this.Cancel(index)}>Cancel&nbsp;&nbsp;</span>
                            </div>
                        )
                    }
                    else if(record.done)return '';
                    else return (
                            record.edit ? <span style={{color: '#108EE9', cursor: 'pointer'}}
                                                onClick={() => this.Save(index)}>Save</span> :
                                <div style={{color: '#108EE9', cursor: 'pointer'}}><span
                                    onClick={() => this.edit(index, record)}>Edit&nbsp;&nbsp;</span>
                                    <Popconfirm title="Are you sure delete this task?"
                                                onConfirm={() => this.delete(index)}
                                                okText="Yes" cancelText="No">
                                        <span>&nbsp;&nbsp;Delete</span>
                                    </Popconfirm>
                                </div>
                        )
                }
            }
        ]
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="todolist">
                <Card>
                    <Row gutter={24}>
                        <Col lg={8} md={24}>
                            <div style={{ border:'1px solid #d9d9d9'}}>
                                <Calendar
                                    onPanelChange={date => this.onPanelChange(date)}
                                    onSelect={date => this.onDateSelect(date)}
                                    dateCellRender={date => this.dateCellRender(date)}
                                    fullscreen={false}/>
                            </div>
                        </Col>
                        <Col lg={16} md={24}>
                            <div className='title'>TODO</div>
                            <Table style={{height: 255}} pagination={false} scroll={{y: 255}} showHeader={false}
                                   columns={columns} rowSelection={rowSelection}
                                   rowKey={(record, key) => key.toString()} dataSource={curData}/>
                            <Button className="button clearfix" onClick={() => this.add()}>Add Item</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
