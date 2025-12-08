import {Container, Row,Col, FormGroup, Label, Button, form} from 'reactstrap';
import logo from '../assests/logo-t.png'
import { UserSchemaValidaton } from '../validations/UserSchemaValidation';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from "react";
import { string } from 'yup';
import utas from "../assests/utas.png";
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import { addUser } from '../features/UserSlice';

const Registration=()=>{

    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [confirmPassword, setConfirnPassword ]=useState("");
    let [profilepic, setPic ]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const message=useSelector((state)=>state.users.message);

    const {
        register,
        handleSubmit: submitForm,
        formState:{errors}
    }=useForm({resolver:yupResolver(UserSchemaValidaton)});

    const handleSubmit=()=>{
       const data={
            uname:name,
            email:email,
            password:password,
            profilepic:profilepic
       }
       dispatch(addUser(data));
     }
     
    return(
        <>
        <Container fluid>
            <Row className='div-row'>
                <Col md='6' className='div-col'>
                <form className='div-form'>
                    <div style={{textAlign: 'center'}}>
                        <img src={logo} />
                    </div>

                    <FormGroup>
                        <input 
                        type="name" 
                        className='form-control'
                        placeholder='Enter Your Name'
                        {...register("name",{value:name, onChange:(e)=>setName(e.target.value)})}
                        />
                        <p style={{color:'red'}}>{errors.name?.message}</p>
                    </FormGroup> 

                    <FormGroup>
                        <input 
                        type="email" 
                        className='form-control'
                        placeholder='Enter Your Email'
                        {...register("email",{value:email, onChange:(e)=>setEmail(e.target.value)})}
                        />
                        <p style={{color:'red'}}>{errors.email?.message}</p>
                    </FormGroup>

                    <FormGroup>
                        <input 
                        type="password" 
                        className='form-control'
                        placeholder='Enter Your Password'
                        {...register("password",  {value:password, onChange:(e)=>setPassword(e.target.value)})}
                        />
                        <p style={{color:'red'}}>{errors.password?.message}</p>
                    </FormGroup>

                    <FormGroup>
                        <input 
                        type="confirm password " 
                        className='form-control'
                        placeholder='Enter Your Confirm Password'
                        {...register("confirmPassword",  {value:confirmPassword, onChange:(e)=>setConfirnPassword(e.target.value)})}
                        />
                        <p style={{color:'red'}}>{errors.confirmPassword?.message}</p>
                    </FormGroup>
                    <FormGroup>
                        <input 
                        type="text" 
                        className='form-control'
                        placeholder='Profile Picture URL'
                        onChange={(e)=>setPic(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                    <Button 
                        className='form-control' 
                        onClick={submitForm((handleSubmit))}
                    >Register</Button>
                    </FormGroup>
                    <FormGroup>
                        <p>{message}</p>
                    </FormGroup>
                    <FormGroup>
                        <Link to="/">Go to Login</Link>
                    </FormGroup>
                </form>
                
                </Col>
                 
                <Col md="6" className="div-col2">
                     <div>
                     <img src={utas} width="600" height="430" />
                     </div>
                </Col> 
            </Row>

        </Container>

        </>

    );
}

export default Registration; 