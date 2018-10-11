import React,{Component} from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react'


class Pie extends Component{
    render() {
        const option1 = {

        }
        return (
            <div className='pie'>
                {/*<Card title='饼状图表一'>*/}
                    {/*<ReactEcharts option={option1} theme='theme'></ReactEcharts>*/}
                {/*</Card>*/}
                {/*<Card title='饼状图表二'>*/}
                    {/*<ReactEcharts option={option1} theme='theme'></ReactEcharts>*/}
                {/*</Card>*/}
            </div>
        )
    }
}

export default Pie