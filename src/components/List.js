import axios from "axios";
import React from "react";
import Item from "./Item";
import {Button,IconButton,TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';





function List(props){
    const[showButton,setShowButton] = React.useState(false);
    //initialising some state with an empty array, to keep track of the users list when we fetch it.
    const [userData,setUserData] = React.useState([]);
    const [inputValue,setInputValue] = React.useState("");

    //gets called every time the text input changes
    function handleChange(event){
        //sets the inputValue state to whatever the text input currently is
        setInputValue(event.target.value)

    }

    //gets called whenever the + button is pressed
    function handleSubmit(){
        setShowButton(false)

        //adds the value from the text field into the list of items
        setUserData(userData=>[...userData,inputValue]);
        setInputValue("");
        
    }

    //runs every time the userData state is updated
    React.useEffect(()=>{
        const list = userData;
        //makes a post request to the backend with the updated list with new items
        axios.post("http://localhost:9000/add-item",{list:list},{withCredentials:true}).then(response=>console.log(response.data)).catch(err=>console.log(err));

    },[userData])
    

    //runs every time the List component is mounted or unmounted.
    React.useEffect(()=>{

        //sends a get request to the backend get-list route
        axios.get("http://localhost:9000/get-list",{withCredentials:true}).then(response=>{
            if(response.data){
                //uses the spread operator to put the list elements from the response into userData.
                setUserData([...userData,...response.data.list]);
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
          {/* controlled component */}
          <form class="input-form">
            <TextField style={{margin:20}} onSelect={()=>setShowButton(true)} value={inputValue} onChange={handleChange}id="filled-basic" label="add items" variant="filled"/>
            {showButton&&<IconButton color="primary" onClick={handleSubmit}><AddIcon/></IconButton>}
            
          </form>
      </div>
    );
}

export default List;