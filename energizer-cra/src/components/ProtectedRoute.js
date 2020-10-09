import React from 'react';
import {Route, Redirect} from 'react-router-dom';


export default function ProtectedRoute(props)
{
 


    let output = null;
    if(props.isAuthenticated) {
        output = <Route {...props} />
    }
    else {
        output =<Redirect to ="/" />
    }

    return(
        <>
        {output}
        </>
    )
}