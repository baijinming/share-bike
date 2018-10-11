import React,{Component} from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react'
import themeLight from '../themeLight'


class Pie extends Component{
    componentWillMount() {
        echarts.registerTheme('theme', themeLight)
    }
    render() {
        const option1 = {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: '10',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : '80%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'周一'},
                        {value:310, name:'周二'},
                        {value:234, name:'周三'},
                        {value:135, name:'周四'},
                        {value:548, name:'周五'},
                        {value:1548, name:'周六'},
                        {value:1548, name:'周日'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        const option2 = {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: '10',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : ['60%','75%'],
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'周一'},
                        {value:310, name:'周二'},
                        {value:234, name:'周三'},
                        {value:135, name:'周四'},
                        {value:548, name:'周五'},
                        {value:1548, name:'周六'},
                        {value:1548, name:'周日'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return (
            <div className='pie'>
                <Card title='饼状图表一'>
                    <ReactEcharts option={option1} theme='theme'></ReactEcharts>
                </Card>
                <Card title='饼状图表二'>
                    <ReactEcharts option={option2} theme='theme'></ReactEcharts>
                </Card>
            </div>
        )
    }
}

export default Pie