import React from "react";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

function Item(props){
    return(
        <div class="list-item" >
            <div class="delete-button">
            <IconButton onClick={()=>props.delete(props.id)}>
                <DeleteIcon/>
            </IconButton>
            </div>
            <div class={props.id==0?"top-item":"item"}>
                <p>{props.children}</p>
                
            </div >

        </div>
    );
}

export default Item;