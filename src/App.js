import logo from './logo.svg';
import './styles.css';
import React from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Item from "./components/Item";
import Login from "./components/Login";

function App() {
  const loggedIn = false;
  const [test,setTest] = React.useState();
  const [myValues,setMyValues] = React.useState(["cake","fruit","coins","saxophone","flour","bread","milk","jar","baby food","dog food","charger","pots","eggs"]);
  const getData = ()=>{
    axios.get("http://localhost:9000").then(response =>{
    setTest(response.data.status);
    console.log(response.data);

  }).catch(error=> console.log("error"))


  }


  return (
    <div class="background">
      <h1>Shopping List</h1>
      <button onClick={getData}>testing</button>
      <p>{test}</p>
      
      <div className="container">
        {!loggedIn?<Login/>:
        myValues.map((item,index)=>{
          return(<Item id={index} key={index}>{item}</Item>)
        })
        }
      </div>
      
      



    </div>
  );
}

export default App;
