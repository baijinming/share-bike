import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { Menu } from 'antd'
import './index.less'


class NavLeft extends Component{
    render() {
        return (
            <div className='nav-left'>
                   <Menu theme='dark'>
                       <Menu.Item key='1'>
                           <Link to='/admin/home'>首页</Link>
                       </Menu.Item>
                       <Menu.Item key='2'>
                           <Link to='/admin/secondPage'>订单管理</Link>
                       </Menu.Item>
                   </Menu>
            </div>
        )
    }
}

export default NavLeft