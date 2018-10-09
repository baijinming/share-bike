import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Gif from './404.gif'
import './index.less'

class NotMatch extends Component{
    render() {
        return (
            <div className='not-match clearfix'>
                <div className='text fll'>
                    <h1>Oh My God!</h1>
                    <p>404 你要的页面未找到！</p>
                    <div>
                        你可以选择 <Link to='/admin/home'>返回首页</Link>
                    </div>
                </div>
                <img src={Gif} alt="" className='fll'/>
            </div>
        )
    }
}

export default NotMatch