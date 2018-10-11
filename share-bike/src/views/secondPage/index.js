import React,{Component} from 'react'
import axios from '../../axios'
import { Card, Select, Form, DatePicker, Button, Table } from 'antd'
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class FilterForm extends Component{
    orderData = [
        {
            label: '全部',
            id: 0
        },
        {
            label: '进行中',
            id: 1
        },
        {
            label: '结束行程',
            id: 2
        }
    ];

    cityData = [
        {
            label: '北京',
            id: '0'
        },
        {
            label: '上海',
            id: '1'
        },
        {
            label: '广东',
            id: '2'
        }
    ];

    //查询
    inquireForm() {
        const form = this.props.form.getFieldsValue()
        console.log(form);
    }
    //重置
    resetForm() {
        this.props.form.resetFields()
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline">
                <FormItem label='城市'>
                    {getFieldDecorator('city')(
                        <Select style={{ width: 200 }} placeholder="请选择一个城市">
                            {this.cityData.map(item =>
                                  <Option value={item.id} key={item.id}>{item.label}</Option>
                            )}
                        </Select>
                    )}
                </FormItem>
                <FormItem label='订单时间'>
                    {getFieldDecorator('date')(
                        <RangePicker></RangePicker>
                    )}
                </FormItem>
                <FormItem label='订单状态'>
                    {getFieldDecorator('status')(
                        <Select style={{ width: 200 }} placeholder="请选择一个状态">
                            {this.orderData.map(item =>
                                <Option value={item.id} key={item.id}>{item.label}</Option>
                            )}
                        </Select>
                    )}
                </FormItem>
                <div className='btns'>
                    <Button type='primary' onClick={() => this.inquireForm()}>查询</Button>
                    <Button onClick={() => this.resetForm()}>重置</Button>
                </div>
            </Form>
        )
    }
}

const FilterFormWrap = Form.create()(FilterForm)

class SecondPage extends Component{
    state = {
        tableData: [],
        pn: 1
    };
    //获取table数据
    getTable() {
        axios.get('https://www.easy-mock.com/mock/5bbb8bf854d6771eb592838d/order/list', {page: this.state.pn}).then(res => {
            this.setState({
                tableData: res.result.item_list
            })
        })
    }
    componentWillMount() {
        this.getTable()
    }
    render() {
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn',
                key: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                },
                key: 'distance'
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay'
            }
        ]
        return (
            <div className='second-page'>
                <Card>
                    <FilterFormWrap></FilterFormWrap>
                </Card>
                <Card>
                    <Button type='primary' style={{marginRight: 10}}>订单详情</Button>
                    <Button type='primary'>结束订单</Button>
                </Card>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={this.state.tableData}
                    >
                    </Table>
                </Card>
            </div>
        )
    }
}

export default SecondPage