import axios from "axios";
import React from "react";
import Item from "./Item";
import {Button} from "@material-ui/core";

// function logout(){
//     axios.get("http://localhost:9000/logout",{withCredentials:true}).then(response=>console.log(response));
// }



function List(props){
    //initialising some state with an empty array, to keep track of the users list when we fetch it.
    const [userData,setUserData] = React.useState([]);

    //runs every time the List component is mounted or unmounted.
    React.useEffect(()=>{

        //sends a get request to the backend get-list route
        axios.get("http://localhost:9000/get-list",{withCredentials:true}).then(response=>{
            if(response.data){
                //uses the spread operator to put the list elements from the response into userData.
                setUserData([...response.data.list]);
            }else{
                console.log("error");
            }
        }).catch(error=>console.log(error))
    },[])
    return(
        <div class="container">
            {/* <Button onClick={logout} variant='contained' color="primary">logout</Button> */}

            {/*if there are elements in userData, then iterate through them, and map each element to an Item component.  */}
           {userData.length>0&&userData.map((item,index)=>{
            return(<Item id={index} key={index}>{item}</Item>)
          })

          }
      </div>
    );
}

export default List;