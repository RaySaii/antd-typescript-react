import * as React from 'react'
import {Row, Col, Input,  Table, Card, Progress} from 'antd'
import * as moment from 'moment'
interface UserPageState {
    data: any[]
    searchText: string
}
export default class UserPage extends React.Component<void, UserPageState> {
    private cache:any[];
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            searchText: ''
        }
    }

    componentWillMount() {
        let {data} = this.state;
        data = [
            {
                id: 183,
                user: 'John Doe',
                date: '11-7-2014',
                remark: 'Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.',
                progress: '',
                label: 55
            },
            {
                id: 219,
                user: 'Alexander Pierce',
                date: '12-7-2016',
                remark: 'Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.',
                progress: '',
                label: 70
            },
            {
                id: 657,
                user: 'Bob Doe',
                date: '8-7-2015',
                remark: 'Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.',
                progress: '',
                label: 30,
            },
            {
                id: 175,
                user: 'Mike Doe',
                date: '3-23-2015',
                remark: 'Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.',
                progress: '',
                label: 90
            },

        ]
        this.cache=data;
        this.setState({data})
    }
    handleValueChange(e:any){
        let {searchText,data}=this.state;
        searchText=e.target.value;
        data=this.cache;
        let reg=new RegExp(searchText,'gi');
        data=data.map(item=>{
            let match:string[]|null=item.user.match(reg);
            if(!match)return null;
            return {
                ...item,
                user:(
                    <span>
                        {item.user.split(reg).map((text,i)=>(i>0?[<span style={{color: '#f50'}}>{match[0]}</span>,text]:text))}
                    </span>
                )
            }
        }).filter(item=>!!item)
        this.setState({searchText,data})
    }
    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: '5%'
            },
            {
                title: 'User',
                dataIndex: 'user',
                key: 'user',
                width: '15%'
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                width: '10%%',
                sorter: (a, b) => {
                    if (moment(a.date).isAfter(b.date))return -1;
                    else return 1;
                }
            },
            {
                title: 'Remark',
                dataIndex: 'remark',
                key: 'remark',
                width: '30%'
            },
            {
                title: 'Progress',
                dataIndex: 'progress',
                key: 'progress',
                width: '30%',
                sorter: (a, b) => a.label - b.label,
                render: (text, record, index) => <Progress showInfo={false} percent={record.label}/>
            },
            {
                title: 'Label',
                dataIndex: 'label',
                key: 'label',
                width: '10%',
                render: (text, record, index) => <div style={{
                    width: 50,
                    height: 20,
                    lineHeight: '20px',
                    textAlign: 'center',
                    color: '#fff',
                    borderRadius: 10,
                    background: '#108EE9'
                }}>{text}%</div>
            },
        ]
        const {data,searchText} = this.state
        return (
            <Card>
                <Row>
                    <Col lg={8} md={24}>
                        <Row type="flex" justify="start">
                            <Input placeholder="filter by name" style={{width: '60%', marginRight: 10}} value={searchText} onChange={e=>this.handleValueChange(e)}/>
                            {/*<Button style={{width: '30%'}} type="primary">Serach</Button>*/}
                        </Row>
                    </Col>
                    <Col lg={24} md={12} style={{marginTop: 20}}>
                        <Table rowKey={(record, key) => key.toString()} bordered={true} columns={columns}
                               dataSource={data}/>
                    </Col>
                </Row>
            </Card>
        )
    }
}
