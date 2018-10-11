import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { Menu } from 'antd'
import './index.less'

const SubMenu = Menu.SubMenu;

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
                       <SubMenu title='图例'>
                           <Menu.Item key='3'>
                               <Link to='/admin/echarts/bar'>柱状图</Link>
                           </Menu.Item>
                           <Menu.Item key='4'>
                               <Link to='/admin/echarts/pie'>饼状图</Link>
                           </Menu.Item>
                       </SubMenu>
                   </Menu>
            </div>
        )
    }
}

export default NavLeft