import React from "react";
import {Button,TextField} from "@material-ui/core";





function Login(){
    const googleAuth = ()=>{
        //opens the /auth/google route from the backend, which redirects to the google login page.
        const myWindow = window.open("http://localhost:9000/auth/google","_self");
    }

    return(
        <div class="form">
            <form>
                {/* runs the googleAuth function when clicked */}
                <Button variant="outlined" color="inherit" onClick={googleAuth}>Sign in with Google</Button>
            
            </form>
        </div>
    )
}
// exports the custom component
export default Login;