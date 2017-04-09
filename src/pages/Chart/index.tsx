import * as React from 'react'
import {Card, Row, Col} from 'antd';
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,BarChart,Legend,Bar,PieChart,Pie,RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,RadialBarChart,RadialBar} from 'recharts';

export default class ChartPage extends React.Component<void, void> {

    render() {
        const data=[
            {name:'PageA',uv:4000,pv:2400},
            {name:'PageB',uv:3000,pv:1398},
            {name:'PageC',uv:2000,pv:9800},
            {name:'PageD',uv:2780,pv:3908},
            {name:'PageE',uv:1890,pv:4800},
            {name:'PageF',uv:2390,pv:3800},
            {name:'PageG',uv:3490,pv:4300},
        ]
        const pieData1=[
            {name:'uv',value:4000},
            {name:'uv',value:3000},
            {name:'uv',value:2000},
            {name:'uv',value:2780},
            {name:'uv',value:1890},
            {name:'uv',value:2390},
            {name:'uv',value:3490},
        ]
        const pieData2=[
            {name:'pv',value:2400},
            {name:'pv',value:1398},
            {name:'pv',value:9800},
            {name:'pv',value:3908},
            {name:'pv',value:4800},
            {name:'pv',value:3800},
            {name:'pv',value:4300},
        ]
        const radarData = [
            { subject: 'Math', A: 120, B: 110, fullMark: 150 },
            { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
            { subject: 'English', A: 86, B: 130, fullMark: 150 },
            { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
            { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
            { subject: 'History', A: 65, B: 85, fullMark: 150 },
        ];
        const radialBarData = [
            {name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8'},
            {name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed'},
            {name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1'},
            {name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d'},
            {name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c'},
            {name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57'},
            {name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658'}
        ];
        const liveChartData=[
            {uv:2400},
            {uv:1398},
            {uv:6800},
            {uv:2780},
            {uv:1890},
            {uv:2390},
            {uv:5090},
        ]
        return (
            <Row gutter={24}>
                <Col lg={12} md={24}>
                    <Card>
                        <AreaChart width={450} height={250} data={data}
                                   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </Card>
                </Col>
                <Col lg={12} md={24}>
                    <Card>
                        <BarChart width={450} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </Card>
                </Col>
                <Col lg={12} md={24}>
                    <Card>
                        <PieChart width={450} height={250} >
                            <Pie data={pieData1} cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                            <Pie data={pieData2} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                        </PieChart>
                    </Card>
                </Col>
                <Col lg={12} md={24}>
                    <Card>
                        <RadarChart outerRadius={90} width={450} height={250} data={radarData}>
                            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                            <PolarGrid />
                            <Legend />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        </RadarChart>
                    </Card>
                </Col>
                <Col lg={12} md={24}>
                    <Card>
                        <RadialBarChart width={450} height={250} innerRadius="10%" outerRadius="80%" data={radialBarData}>
                            <RadialBar startAngle={90} endAngle={-270} minAngle={15} label background clockWise={true} dataKey='uv' />
                            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                            <Tooltip />
                        </RadialBarChart>
                    </Card>
                </Col>
                <Col lg={12} md={24}>
                    <Card>
                        <LiveChart data={liveChartData}/>
                    </Card>
                </Col>
            </Row>
        )
    }
}
interface LiveChartProps{
    data:any[]
}
interface LiveChartState{
    data:any[]
}
class LiveChart extends React.Component<LiveChartProps,LiveChartState>{
    state={
        data:[]
    }
    componentWillMount(){
        this.setState({data:this.props.data})
    }
    componentDidMount(){
        let {data}=this.state;
        setInterval(()=>{
            let item=data.shift();
            data.push(item);
            this.setState({data})
        },1000)
    }
    render(){
        return (
            <AreaChart width={450} height={250} data={this.state.data}
                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        )
    }
}
