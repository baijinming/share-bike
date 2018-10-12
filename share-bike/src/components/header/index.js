import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './index.less'
import {nowTime} from '../../utils'
import {connect} from 'react-redux'

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
        axios.get('http://t.weather.sojson.com/api/weather/city/101010100').then(res=> {
            let form = res.data.data.forecast[0];
            let weatherStr = `${form.low}~${form.high} ${form.fx} ${form.fl}`;
            this.setState({
                weather: weatherStr
            })
        })
    }
    componentWillMount() {
        this.getTime();
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
                        {this.props.navTitle}
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

export default connect(
    (state) => ({
        navTitle: state.title
    })
)(Header)