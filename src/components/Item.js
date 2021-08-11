import React from "react";

function Item(props){
    return(
        <div class={props.id==0?"top-item":"item"}>
            <p>{props.children}</p>
        </div>
    );
}

export default Item;