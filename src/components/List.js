import axios from "axios";
import React from "react";
import Item from "./Item";
import {Button,IconButton,TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {Redirect} from "react-router-dom"





function List(props){

    //sets whether the add button should be visible or not
    const[showButton,setShowButton] = React.useState(false);

    //initialising some state with an empty array, to keep track of the users list when we fetch it.
    const [userData,setUserData] = React.useState([]);

    //keeps track of the value of the text input
    const [inputValue,setInputValue] = React.useState("");

    //sets whether the user is authenticated, and allowed on the shopping list page
    const [allowed,setAllowed] = React.useState(true);

    //gets passed as a prop into the Item component, and gets called when the user presses the delete button
    function handleDelete(id){
        console.log(id)
        setUserData(userData=>{
            let newArray = [...userData];

            //removes the element at the chosen index
            newArray.splice(id,1);

            return newArray;
        })
    }

    //gets called every time the text input changes
    function handleChange(event){
        setInputValue(event.target.value);
        //sets the inputValue state to whatever the text input currently is
        

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

        //makes a post request to the backend with the updated list with new items
        if(userData.length>0){
            axios.post("http://localhost:9000/add-item",{list:userData},{withCredentials:true})
                .then(response=>console.log(response.data))
                .catch(err=>console.log(err));
        }

    },[userData])
    

    //runs every time the List component is mounted or unmounted.
    React.useEffect(()=>{

        //sends a get request to the backend get-list route
        axios.get("http://localhost:9000/get-list",{withCredentials:true}).then(response=>{
            if(response.data){
                console.log(response.data)

                //uses the spread operator to put the list elements from the response into userData.
                setUserData([...userData,...response.data.list]);
            }else{
                console.log("error");
                setAllowed(false);
            }
        }).catch(error=>{
            console.log(error);
            setAllowed(false)
        })
    },[])
    return(

            <div class="container">
                {!allowed&&<Redirect to={{pathname:"/"}}/>}
                
                {/* <Button onClick={logout} variant='contained' color="primary">logout</Button> */}

                {/*if there are elements in userData, then iterate through them, and map each element to an Item component.  */}
            {userData.length>0&&userData.map((item,index)=>{
                return(<Item delete={handleDelete} id={index} key={index}>{item}</Item>)
            })

            }
            {/* controlled component */}

            <form class={showButton?"input-form-button":"input-form"}>
                <TextField 
                    //listens to every keypress, if enter is pressed, run the submit handler
                    onKeyDown={event=>event.key=="Enter"?handleSubmit():null}
                    autoFocus

                    //hides the add button if the user clicks off the text input while it's still empty
                    onBlur={()=>inputValue==""?setShowButton(false):null}

                    style={{margin:"20px"}}

                    //shows the add button when the text input is selected
                    onSelect={()=>setShowButton(true)}
                    value={inputValue}

                    //runs the handleChange function every time the input is changed
                    onChange={handleChange}
                    id="filled-basic"
                    label="add items"
                    variant="filled"
                />
                {/* if showbutton is true, then show icon button */}
                {showButton&& <IconButton color="primary" onClick={handleSubmit}><AddIcon/></IconButton> }
                
            </form>
            {/* conditonal rendering. displays the delete button if userData contains any values */}
            {userData.length>0&&<Button onClick={()=>setUserData([])} variant="contained">delete list</Button>}
        </div>


    );
}

export default List;