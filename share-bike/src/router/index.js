import React,{Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'
import Admin from '../views/admin'
import Home from '../views/home'
import NotMatch from '../views/notMatch'
import SecondPage from '../views/secondPage'
import Detail from '../views/secondPage/detail'
import Bar from '../views/echarts/bar'
import Pie from '../views/echarts/pie'

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='/admin' render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/admin/home' component={Home} />
                                    <Route path='/admin/secondPage' component={SecondPage} />
                                    <Route path='/admin/echarts/bar' component={Bar} />
                                    <Route path='/admin/echarts/pie' component={Pie} />
                                    <Route component={NotMatch} />
                                </Switch>
                            </Admin>
                        } />
                        <Route path='/order/detail/:id' component={Detail} />
                        <Route component={NotMatch} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default Router