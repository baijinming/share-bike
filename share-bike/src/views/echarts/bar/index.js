import React,{Component} from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react'
import echartsTheme from '../echartTheme'


class Bar extends Component{
    componentWillMount() {
        echarts.registerTheme('theme', echartsTheme)
    }
    render() {
        const option1 = {
            title: {
                text: 'OFO周订单'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'ofo订单量',
                    type:'bar',
                    barWidth: '60%',
                    data:[8000, 5200, 20000, 13400, 39000, 30300, 20020]
                }
            ]
        }
        const option2 = {
            title: {
                text: '用户骑行订单'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['OFO', '摩拜', '小蓝单车']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'OFO',
                    type:'bar',
                    data:[500, 1000, 1600, 3000, 2800, 2600, 2870]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [600, 1200, 1800, 5000, 6000, 8000, 10000]
                },
                {
                    name: '小蓝单车',
                    type: 'bar',
                    data: [300, 600, 800, 1800, 2000, 1500, 1000]
                }
            ]
        }
        return (
            <div className='bar'>
                <Card title='柱状图表一'>
                    <ReactEcharts option={option1} theme='theme'></ReactEcharts>
                </Card>
                <Card title='柱状图表二'>
                    <ReactEcharts option={option2} theme='theme'></ReactEcharts>
                </Card>
            </div>
        )
    }
}

export default Bar