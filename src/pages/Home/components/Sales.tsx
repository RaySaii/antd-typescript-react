import * as React from 'react';
import './Sales.less';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Sales: React.StatelessComponent<void> = () => {
    const data = [
        {name: '2008', Food: 4000, Clothes: 2400, Electronics: 2400},
        {name: '2009', Food: 3000, Clothes: 1398, Electronics: 2210},
        {name: '2010', Food: 2000, Clothes: 9800, Electronics: 2290},
        {name: '2011', Food: 2780, Clothes: 3908, Electronics: 2000},
        {name: '2012', Food: 2500, Clothes: 4800, Electronics: 2181},
        {name: '2013', Food: 1220, Clothes: 3800, Electronics: 2500},
        {name: '2014', Food: 2300, Clothes: 4300, Electronics: 2100},
        {name: '2015', Food: 2300, Clothes: 4300, Electronics: 2100}
    ];
    return (
        <div className="sales">
            <div className='title'>Yearly Sales</div>
            <ResponsiveContainer height={360}>
                <LineChart data={data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name" axisLine={{strokeWidth: 1}} tickLine={false}/>
                    <YAxis axisLine={false} tickLine={false}/>
                    <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                    <Tooltip wrapperStyle={{border: 'none', boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)'}}
                             content={content => {
                                 const list = content.payload.map((item, key) => <li key={key}
                                                                                     className="tipitem"><span
                                     className="radiusdot"
                                     style={{background: item.color}}/>{`${item.name}:${item.value}`}</li>);
                                 return <div className="tooltip"><p className="tiptitle">{content.label}</p>
                                     <ul>{list}</ul>
                                 </div>;
                             }}/>
                    <Legend verticalAlign="top" content={props => {
                        const {payload} = props;
                        return (
                            <ul className="legend clearfix">
                                {payload.map((item, key) =>
                                    <li key={key}><span className="radiusdot"
                                                        style={{background: item.color}}/>{item.value}
                                    </li>
                                )}
                            </ul>
                        );
                    }}/>
                    <Line type="monotone" dataKey="Food" stroke="purple" strokeWidth={3} dot={{fill: 'purple'}}
                          activeDot={{r: 5, strokeWidth: 0}}/>
                    <Line type="monotone" dataKey="Clothes" stroke="red" strokeWidth={3} dot={{fill: 'red'}}
                          activeDot={{r: 5, strokeWidth: 0}}/>
                    <Line type="monotone" dataKey="Electronics" stroke="green" strokeWidth={3} dot={{fill: 'green'}}
                          activeDot={{r: 5, strokeWidth: 0}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
export {Sales as default}
