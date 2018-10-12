import React,{Component} from 'react'
import axios from '../../axios'
import { Card, Select, Form, DatePicker, Button, Table, message, Modal } from 'antd'
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
    inquireForm= () => {
        const form = this.props.form.getFieldsValue()
        console.log(form);
    }
    //重置
    resetForm= () => {
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
        pn: 1,
        isLoading: false,
        selectedRowKeys: [],
        selectedItem: [],
        pagination: {},
        visible: false,
        ebikeInfo: []
    };
    //获取table数据
    getTable= () => {
        this.setState({
            isLoading: true
        })
        axios.get('/order/list', {page: this.state.pn}).then(res => {
            this.setState({
                tableData: res.result.item_list.map((item, index) => {
                    item.key = index
                    return item
                }),
                isLoading: false,
                pagination: {
                    pageSize: 10,
                    total: res.result.total_count,
                    current: this.state.pn,
                    onChange: (page, pageSize) => {
                        this.setState({
                            pn: page,
                            selectedRowKeys: [],
                            selectedItem: [],
                        },() => this.getTable())
                    }
                }
            })
        })
    }
    //打开结束订单model
    endModal= () => {
        if(!this.state.selectedItem.length) {
            message.warning('请选择一个订单')
        }else {
            axios.get('/order/ebike_info').then(res => {
                this.setState({
                    ebikeInfo: res.result,
                    visible: true
                })
            })
        }
    }
    //结束订单
    endOrder= () => {
        axios.get('/order/finish_order', {id: this.state.ebikeInfo.id}).then(res => {
            message.success('成功结束订单')
            this.setState({
                visible: false,
                selectedRowKeys: [],
                selectedItem: [],
            })
            this.getTable()
        })
    }
    //订单详情
    ebikeDetail= () => {
        if (!this.state.selectedItem.length) {
            message.warning('请选择一个订单')
        } else {
            let id = this.state.selectedItem[0].id
            window.open(`/#/order/detail/${id}`, '_blank')
        }
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
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedItem: selectedRows
                })
            }
        }
        return (
            <div className='second-page'>
                <Card>
                    <FilterFormWrap></FilterFormWrap>
                </Card>
                <Card>
                    <Button type='primary' style={{marginRight: 10}} onClick={this.ebikeDetail}>订单详情</Button>
                    <Button type='primary' onClick={this.endModal}>结束订单</Button>
                </Card>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={this.state.tableData}
                        loading={this.state.isLoading}
                        rowSelection={rowSelection}
                        pagination={this.state.pagination}
                    >
                    </Table>
                </Card>
                <Modal
                    title='结束订单'
                    visible={this.state.visible}
                    okText="结束"
                    cancelText="取消"
                    onCancel={() => this.setState({visible: false})}
                    onOk={this.endOrder}
                >
                    <p><strong>车辆编号：</strong>{this.state.ebikeInfo.bike_sn}</p>
                    <p><strong>剩余电量：</strong>{this.state.ebikeInfo.battery}</p>
                    <p><strong>行程开始时间：</strong>{this.state.ebikeInfo.start_time}</p>
                    <p><strong>当前位置：</strong>{this.state.ebikeInfo.location}</p>
                </Modal>
            </div>
        )
    }
}

export default SecondPage