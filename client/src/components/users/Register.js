import React from 'react'
import axios from '../../config/axios'

 class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            username:'',
            email:'',
            password:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        }

handleChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
}
handleSubmit(e) {
    e.preventDefault()
    const formData = {
        username: this.state.name,
        email: this.state.email,
        password: this.state.password
    }
    console.log(formData)
    axios.post('/users/register',formData)
    .then(response=>{
        if(response.data.hasOwnProperty('errors')){
            alert(response.data.message)
        }else{
            this.props.history.push('/users/login')
        }
    })
    
}
render() {
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                    userName <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
                </label> <br/>
                <label>
                    email <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                </label> <br/>
                <label>
                    password<input type="password" value={this.state.mobile} onChange={this.handleChange} name="password" />
                </label> <br/>
                <input type="submit" />

            </form>
        </div>
    )
}
}

export default Register