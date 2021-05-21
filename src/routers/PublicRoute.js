import React from 'react'
//import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'



const PublicRoute =  ({
    //isAuthenticated,
    component: Component,
    ...rest
    }) => {
        //let authData = undefined
        // const authData = useSelector((state) => state.auth.authData)
        // let token = undefined
        // if(authData) {
        //     token = authData?.token
        // }
    //isAuthenticated= !!localStorage.getItem('profile').token
    //console.log(`Public Route, ${localStorage.getItem('profile').token}, ${isAuthenticated}`)
    return ( 
    <Route {...rest} component={(props) => (
        localStorage.getItem('user') ? (
            <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
           
        ) : (
            <div>
            <Component {...props} />
        </div> 
        )
    )
}/>
)
}

//const isAuthenticated = !!user.uid

// const mapStateToProps = (state) => ({
//     isAuthenticated: !!state.auth.uid
// })

export default PublicRoute