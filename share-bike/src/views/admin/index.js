import React,{Component} from 'react'
import { Row, Col} from 'antd'
import './index.less'
import Header from '../../components/header'
import Footer from '../../components/footer'
import NavLeft from '../../components/navLeft'

class Admin extends Component{
    render() {
        return (
            <div className='admin'>
                <Row>
                    <Col span={4}>
                        <NavLeft />
                    </Col>
                    <Col span={20}>
                        <Header />
                        <div className='content-warp'>
                            <div className='content'>
                                {this.props.children}
                            </div>
                        </div>
                        <Footer />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Admin