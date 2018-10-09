import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './index.less'
import {nowTime} from '../../utils'

class Header extends Component{
    state ={
        time: '',
        weather: ''
    }
    getTime() {
        setInterval(() => {
            let timeStr = nowTime(new Date().getTime())
            this.setState({
                time: timeStr
            })
        },1000)
    }
    getWeather() {
        fetch('http://t.weather.sojson.com/api/weather/city/101010100').then(res=> res.json()).then(json=> {
            let form = json.data.forecast[0]
            let weatherStr = `${form.low}~${form.high} ${form.fx} ${form.fl}`
            this.setState({
                weather: weatherStr
            })
        })
    }
    componentWillMount() {
        this.getTime()
        this.getWeather()
    }
    render() {
        return (
            <div className='header clearfix'>
                <div className='user-info'>
                    <div className='flr login-out'>
                        <Link to='/login'>退出</Link>
                    </div>
                    <div className='flr'>欢迎，<strong className='username'>张怡宁</strong></div>
                </div>
                <div className='weather-warp'>
                    <div className='breadcrumb fll'>
                        首页
                    </div>
                    <div className='flr'>
                        <div className='fll'>{this.state.time}</div>
                        <div className='fll weather'>{this.state.weather}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header