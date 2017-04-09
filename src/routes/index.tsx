import * as React from 'react';
import {Router, Route,hashHistory,IndexRedirect} from 'react-router';
import asyncComponent from './asyncComponent';
// import Layout from '../layout/index';
// import HomePage from '../pages/Home/index';
// import UserPage from '../pages/Users/index';
// import Search from "../pages/UI/Search/index";
// import FormPage from "../pages/Form/index";
// import LoginPage from '../pages/Login/index';

const Layout=asyncComponent(()=>System.import('../layout/index'));
const HomePage=asyncComponent(()=>System.import('../pages/Home/index'));
const UserPage=asyncComponent(()=>System.import('../pages/Users/index'));
const Search=asyncComponent(()=>System.import('../pages/UI/Search/index'));
const FormPage=asyncComponent(()=>System.import('../pages/Form/index'));
const LoginPage=asyncComponent(()=>System.import('../pages/Login/index'));
const ChartPage=asyncComponent(()=>System.import('../pages/Chart/index'))
const TablePage=asyncComponent(()=>System.import('../pages/Table/index'))

const isLogin=(nextState,replace,callback)=>{
    if(localStorage.userName){
        callback()
    }else {
        replace('/login');
        callback()
    }
}

const App=()=>{
    return (
        <Router history={hashHistory}>
            <Route path="/" onEnter={isLogin} component={Layout}>
                <IndexRedirect to="dashboard"/>
                <Route path="dashboard" component={HomePage}/>
                <Route path="users" component={UserPage}/>
                <Route path="form" component={FormPage}/>
                <Route path="table" component={TablePage}/>
                <Route path="chart" component={ChartPage}/>
                <Route path="ui">
                    <Route path="search" component={Search}/>
                </Route>
            </Route>
            <Route path="/login" component={LoginPage}/>
        </Router>
    )
}
export {App as default}
