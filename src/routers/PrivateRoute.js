import React from 'react'
//import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoute =  ({
    //isAuthenticated,
    component: Component,
    ...rest
    }) => {
    //let authData = undefined
    //const authData = useSelector((state) => state.auth.authData)
    // let token = undefined
    // if(authData) {
    //     token = authData?.token
    // }
    //token =  useSelector((state) => state.auth.authData)
    
    //isAuthenticated= !!localStorage.getItem('profile').token
    //console.log(`Private Route,${isAuthenticated}`)
    const user = useSelector(state => state.auth?.user);
    return (
        <Route {...rest} component={(props) => (
            user?.token ? (
                <div>
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
        )
    }/>
    )   
}
export default PrivateRoute