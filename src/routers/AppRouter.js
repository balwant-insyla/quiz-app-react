import React from 'react'
import { BrowserRouter, Switch }  from 'react-router-dom'
//import { createBrowserHistory } from 'history'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Auth from '../../src/components/Auth/Auth'
import Home from '../../src/components/Home/Home'
import Subject from '../../src/components/Subjects/Subject'
import Questions from '../../src/components/Questions/Questions'
import QuestionView from '../components/Questions/QuestionView'
import QuestionEdit from '../components/Questions/QuestionEdit'
import AddQuestion from '../../src/components/Questions/AddQuestion'
import Students from '../../src/components/Students/Students'
import Profile from '../../src/components/Profile/Profile'
import { Container } from '@material-ui/core'
import Quiz from '../../src/components/Quiz/Quiz'
//export const history = createBrowserHistory()

const AppRouter = () => (
    <BrowserRouter>
    <Container disableGutters maxWidth={false}>
        <Switch>
            <PublicRoute path="/" exact component={Auth} />
            <PrivateRoute path="/home" exact component={Home}/>
            <PrivateRoute path="/subjects" exact component={Subject}/>
            <PrivateRoute path="/questions" exact component={Questions}/>
            <PrivateRoute path="/questions/add" exact component={AddQuestion}/>
            <PrivateRoute path="/questions/view/:id" exact component={QuestionView}/>
            <PrivateRoute path="/questions/edit/:id" exact component={QuestionEdit}/>
            <PrivateRoute path="/students" exact component={Students}/>
            <PrivateRoute path="/profile" exact component={Profile}/>
            <PrivateRoute path="/quiz" exact component={Quiz}/>


            {/*
            <PrivateRoute path="/create" component={AddExpensePage} />
            <PrivateRoute path="/edit/:id" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
            <Route component={NotFoundPage} 
            */ }
        </Switch>
        </Container>
    </BrowserRouter>
)

export default AppRouter