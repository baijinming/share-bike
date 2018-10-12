import React,{Component} from 'react'
import './detail.less'
import {Link} from 'react-router-dom'
import axios from '../../axios'
import Footer from '../../components/footer'

class Detail extends Component {
    state = {
        orderDetail: {}
    }

    componentWillMount() {
        this.getDetail()
    }

    //获取订单详情
    getDetail= () => {
        let id = this.props.match.params.id;
        axios.get('/order/detail', {id}).then(res => {
            this.setState({
                orderDetail: res.result
            })
            this.initMap(res.result)
        })
    }
    //创建地图
    initMap= (info) => {
        this.map = new window.BMap.Map("baiduMap");//初始化地图
        let point = new window.BMap.Point(info.position_list[info.position_list.length-1].lon, info.position_list[info.position_list.length-1].lat);
        this.map.centerAndZoom(point, 13);//创建中心点
        this.map.enableScrollWheelZoom(true);//开启鼠标滑轮缩放地图

        //添加控件
        this.addControl()
        //创建起点终点和绘制折线
        this.drawLine(info.position_list)
        //绘制服务区
        this.drawServerArea(info.area)
    }

    //添加控件
    addControl= () =>{
        this.map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        this.map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT, offset: new window.BMap.Size(150, 5)}));
    }
    //创建起点终点和绘制折线
    drawLine= (points) => {
        let startPoint = new window.BMap.Point(points[0].lon, points[0].lat);
        let endPoint = new window.BMap.Point(points[points.length-1].lon, points[points.length-1].lat);
        //自定义坐标点图标
        let startIcon = new window.BMap.Icon("/imgs/start_point.png", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42)
        });
        let endIcon = new window.BMap.Icon("/imgs/end_point.png", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42)
        });
        // 创建标注
        let marker1 = new window.BMap.Marker(startPoint, {icon: startIcon});
        let marker2 = new window.BMap.Marker(endPoint, {icon: endIcon});
        //将起点和终点添加上地图
        this.map.addOverlay(marker1);
        this.map.addOverlay(marker2);

        //创建折线
        let pointsArr = points.map(point => {
            return new window.BMap.Point(point.lon, point.lat)
        })
        let polyline = new window.BMap.Polyline(pointsArr,
            {strokeColor:"blue", strokeWeight:3, strokeOpacity:1}
        );
        this.map.addOverlay(polyline);
    }
    //绘制服务区
    drawServerArea= (area) => {
        let points = area.map(point => new window.BMap.Point(point.lon,point.lat))
        let polygon = new window.BMap.Polygon(points, {
            strokeColor: 'red',
            fillColor: '#ffa786',
            fillOpacity: 0.5
        })
        this.map.addOverlay(polygon)
    }

    render() {
        return (
            <div className='detail'>
                <div className='header clearfix'>
                    <p className='fll title'>共享单车后台系统</p>
                    <div className='flr'>
                        <div className='fll'>欢迎，<strong className='username'>张怡宁</strong></div>
                        <div className='fll'>
                            <Link to='/login'>退出</Link>
                        </div>
                    </div>
                </div>
                <div className='map' id='baiduMap'></div>
                <div className='detail-info'>
                    <p className='title'>基础信息</p>
                    <ul className='info'>
                        <li><span className='info-left'>用车模式</span><span className='info-right'>{this.state.orderDetail.mode==1 ? '服务区' : '停车点'}</span></li>
                        <li><span className='info-left'>订单编号</span><span className='info-right'>{this.state.orderDetail.order_sn}</span></li>
                        <li><span className='info-left'>车辆编号</span><span className='info-right'>{this.state.orderDetail.bike_sn}</span></li>
                        <li><span className='info-left'>用户姓名</span><span className='info-right'>{this.state.orderDetail.user_name}</span></li>
                        <li><span className='info-left'>手机号码</span><span className='info-right'>{this.state.orderDetail.mobile}</span></li>
                    </ul>
                </div>
                <div className='detail-info'>
                    <p className='title'>行驶轨迹</p>
                    <ul className='info'>
                        <li><span className='info-left'>行程起点</span><span className='info-right'>{this.state.orderDetail.start_location}</span></li>
                        <li><span className='info-left'>行程终点</span><span className='info-right'>{this.state.orderDetail.end_location}</span></li>
                        <li><span className='info-left'>行驶里程</span><span className='info-right'>{this.state.orderDetail.distance/1000+'KM'}</span></li>
                    </ul>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Detail