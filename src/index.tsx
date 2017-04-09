import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './routes/index';
import 'antd/dist/antd.css';
import './index.less';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
