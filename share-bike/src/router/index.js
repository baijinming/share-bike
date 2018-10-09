import React,{Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'
import Admin from '../views/admin'
import Home from '../views/home'
import NotMatch from '../views/notMatch'
import SecondPage from '../views/secondPage'

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
                                    <Route component={NotMatch} />
                                </Switch>
                            </Admin>
                        } />
                        <Route component={NotMatch} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default Router