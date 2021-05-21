import React from 'react'
//import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'



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
    return (
        <Route {...rest} component={(props) => (
            localStorage.getItem('user') ? (
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


//const isAuthenticated = !!user.uid

// const mapStateToProps = (state) => ({
//     isAuthenticated: !!state.auth.uid
// })

export default PrivateRoute