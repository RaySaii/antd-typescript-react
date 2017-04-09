import * as React from 'react';
const icon = require('../../../assets/晴.png')
import './Weather.less';

const Weather: React.StatelessComponent<void> = () => {
    const data = {
        weather: '晴',
        temperature: '22',
    }
    return (
        <div className="weather">
            <div className="left">
                <img className="icon" src={icon}/>
                <p>{data['weather']}</p>
            </div>
            <div className="right">
                <h1 className="temperature">{`${data['temperature']}°`}</h1>
                <p className="description">{`杭州 Today`}</p>
            </div>
        </div>
    );
}
export {Weather as default}
