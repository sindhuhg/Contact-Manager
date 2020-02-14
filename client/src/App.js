import React from 'react'
import axios from './config/axios'
import Register from './components/users/Register'
import Home from './components/common/Home'
import Login from './components/users/Login'
import { BrowserRouter,Route,Link } from "react-router-dom";
import ContactList from './components/contacts/List'


export default function App(props){
    console.log(props)
    function handleClick(){
        axios.delete('/users/logout',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response =>{
            console.log(response)
            alert(response.data.notice)
            localStorage.removeItem('token')
            window.location.reload()
            window.location.href="/"
        })
    }
    return (
        <BrowserRouter>
        <div>
            <h2>Contact manager</h2> 
            <ul>
            <li><Link to="/">Home</Link> </li>
            {
                localStorage.getItem('token') ?(
                    <div>
                        <li><Link to="/contacts">Contacts</Link> </li>
                        <li><Link to="#" onClick={handleClick}>Logout</Link> </li>
                        
                    </div>
                ):(
                    <div>
                                    
                        <li><Link to="/users/Register">Register</Link> </li>
                        <li><Link to="/users/login">Login</Link> </li>
                    </div>
                )
            }

                <Route path="/" component={Home}/>
                <Route path="/users/Register" component={Register}/>                
                <Route path="/users/login" component={Login}/>
                <Route path="/contacts" component={ContactList}/>
            </ul>
        </div>
        </BrowserRouter>
    );
}
//export default App;