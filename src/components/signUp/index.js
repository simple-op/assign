import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Textfild from "./Textfield"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Redirect} from "react-router-dom"

import axios from "axios";
import "./index.css";

const styles = theme => ({
    email: {
        background: '#48a026',
        color: 'white',
    },
    gmail: {
        background: '#4385f5',
    },

});




class index extends Component {
    constructor(props) {
        super(props);
        this.name="";
        this.state = {
            showPassword: false,
            email: '',
            name: '',
            password: '',
            role:'student',
            loader:false,
            login:false,
            error:false,
            msg:"All fields are Required!!!"
        };
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            error:false
        });
    };
    
    
    signUp=()=>{
        console.log(this.name);
        
      const data=JSON.stringify( {
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            role:this.state.role
        });
       
        this.setState({
            ...this.state,
           loader:true,
           error:false
        });
        axios({
            method:"post",
            url:"https://assign-backend.herokuapp.com/signup",
            data:data,
           headers:{ 'Content-Type': 'application/json'    }  
        }).then((res)=>{
         
         

           this.setState({
            ...this.state,
           loader:false,
           login:true
        });
        }).catch((res)=>{
             console.log(res)
            this.setState({
                ...this.state,
               loader:false,
               error:true,
               msg:res.message=="Request failed with status code 409"?"Already registered!!":this.state.msg
            });
        })

    }





    render() {
console.log(this.state);
        const {
            email,
            name,
            password,
            role,
            loader,
            login,msg


        } = this.state;
        const { classes } = this.props;
        if(login)
        return <Redirect  to={"login"}/>  

        return (
<div className={"form"}>         
           <Card style={{ boxShadow: 'none',width:"20rem" }}>
                    <CardContent>
                        <CssBaseline />

                        <Typography
                            variant='h4'
                            style={{
                                fontWeight: '500',
                                textAlign: 'center',
                                marginBottom: '1rem',
                                marginTop: '1rem',
                            }}
                        >
                            Sign Up
                           </Typography>



                       
                               <Textfild state={this.state}></Textfild>
                           
                                <TextField
                                    variant='outlined' 
                                    margin='normal'
                                    fullWidth
                                    size='small'
                                    value={email}
                                    name='email'
                                    label='Email Address'
                                
                                    id='email'
                                  
                                    autoComplete='email'
                                    onChange={this.handleChange}
                                />
                          
                    
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    size='small'
                                    value={password}
                                    name='password'
                                    label='Password'
                                    type="password"
                                    id='password'
                                   
                                    autoComplete='password'
                                    onChange={this.handleChange}
                                />
                          
                        <FormControl   style={{width:"100%",marginTop:"16px"}} variant="outlined" 
                      
                        >
                            <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
                          
                            <Select
                            name="role"
                          className={"dropdown"}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
        //   value={}
         defaultValue={"student"}
         
          onChange={this.handleChange}
          label="Role"
        >
         
          <MenuItem value={"student"}>Student</MenuItem>
          <MenuItem value={"teacher"}>Teacher</MenuItem>
        </Select>

                        </FormControl>
                        
                               {this.state.loader?<div><LinearProgress style={{marginBottom:"10px "}}/><LinearProgress color={"secondary"}/></div>:<Button
                                    style={{marginBottom:"20px"}}
                                    type='submit'
                                    id='signin'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    onClick={this.signUp}
                                >
                                    Sign Up
                              </Button>

                             
                              
                             }
                             { this.state.error&&<div style={{color:"red",
                            textAlign:"center",
                            fontWeight:"bold"
                            
                            }}>{msg}</div>}
                           <Button
                                
                                type='submit'
                                id='signin'
                                variant='contained'
                                color='primary'
                                fullWidth
                                onClick={()=>{
                                    this.setState({
                                        ...this.state,
                                       
                                        login:true
                                    })
                                }}
                            >
                               Login
                          </Button>


                    </CardContent>
                </Card>
</div>
          

        );
    }
}




export default withStyles(styles)(index);



