import React from 'react'

import axios from '../../config/axios'

export default class ContactList extends React.Component{
    constructor(){
        super()
        this.state={
            contacts:[]
        }
    }
    componentDidMount(){
        axios.get('/contacts',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log(response.data)
            const contacts=response.data
            this.setState({contacts})
        })
    }
    render(){
        console.log(localStorage.getItem('token'))
        return(
            <div>
                <h2>Listing Contacts  - {this.state.contacts.length}</h2>
                <ul>
                    {this.state.contacts.map((contact)=>{
                        return <li key={contact._id}>{contact.name}</li>
                    })}
                </ul>
            </div>
        )
    }
}