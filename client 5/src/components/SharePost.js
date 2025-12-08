import { Container,Row,Col,Input,Button } from "reactstrap";
import banner from '../assests/banner.jpg';
import { useState, dispatch } from "react";
import { useDispatch } from "react-redux";
import { savePost } from "../features/PostSlice";
import {useSelector} from 'react-redux';
 
const SharePost=()=>{
    let [msg,setMsg]=useState("");
    let [lat,setLat]=useState();
    let [lng,setLng]=useState();
    dispatch=useDispatch();
    const email=useSelector((state)=>state.users.user.email);
    if(navigator.geolocation){
        navigator.geolocation.watchPosition(function(position){
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        });
    }
 
    const handlePost=()=>{
        if (msg=="")
            alert("Please enter your before posting !!!")
        else{
            const data={
                postMsg:msg,
                email:email,
                lat:null,
                lng:null
            }
            dispatch(savePost(data));
        }
    }
    const handleLocation=()=>{
        const lmsg=msg==""?"My Live Location..":msg;
           const data={
                postMsg:lmsg,
                email:email,
                lat:lat,
                lng:lng
            }
            dispatch(savePost(data));    
    }
    return(
        <Container>
            <Row>
                <img src={banner} className='bannerpic'/>
            </Row>
 
            <Row>
                <h3>share.Connect</h3>
            </Row>
 
            <Row>
                <Col md='9'>
                    <Input type='textarea' className='control-form'
                     placeholder='share your thoughts!..'
                     onChange={(e)=>setMsg(e.target.value)}/>
                </Col>
 
                <Col>
                <Row>
                    <Button color="success" onClick={handlePost}>POST</Button>
                </Row>
                <Row>
                   <Button color="danger" onClick={handleLocation}>SHARE LOCATION</Button>
                </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default SharePost;