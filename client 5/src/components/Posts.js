import { useDispatch, useSelector } from "react-redux";
import { getPosts,updatePost,delPost } from "../features/PostSlice";
import { useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Button, Row, Col, Input } from "reactstrap";
import moment from "moment";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Posts = () => {
    const posts = useSelector((state) => state.posts.posts);
    const email = useSelector((state) => state.users.user.email);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [postMsg, setMsg] = useState("");
    const [postID, setID] = useState("");

    const toggle = (msg,id) => {
        setModal(!modal);
        setMsg(msg);
        setID(id);
    }

    const handleUpdate=()=>{
        const data={
            postMsg:postMsg,
            _id:postID
        }
        dispatch(updatePost(data));
        dispatch(getPosts());
    }

    const handleDelete=(pid)=>{
        if(window.confirm("Are you sure to delete this message!..")==true){
            dispatch(delPost(pid));
            dispatch(getPosts());
        }
    }

    useEffect(() => {
        dispatch(getPosts());
    }, [posts]);

    return (
        <div>
            {
                posts.map((post) => {
                    return (
                        <Row>
                            <Col md='1'></Col>
                            <Col md='6'>
                                <Card
                                    className="my-2"
                                    style={{
                                        width: '40rem'
                                    }}
                                >
                                    <CardHeader>
                                        <img src={post.user[0].profilepic} className="postImg" />&nbsp;
                                        <b>{post.user[0].uname}</b>
                                        <p>{moment(post.createdAt).fromNow()}</p>
                                    </CardHeader>
                                    <CardBody>
                                        <CardText>
                                        {
                                                post.lat & post.lng?(
                                                    <>
                                                    {post.postMsg}<br/>
                                                    <iframe src={`https://maps.google.com/maps?q=${post.lat},${post.lng}&h1=es;&output=embed`} width="auto" height="auto"/>

                                                    </>
                                                ):post.postMsg
                                            }
                                        </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <Row>
                                            <Col xs="1"><AiOutlineLike /></Col>
                                            <Col xs="1"><AiOutlineDislike /></Col>
                                            <Col></Col>
                                            {email == post.email ?
                                                <>
                                                    <Col xs="1"><FaRegEdit onClick={()=>toggle(post.postMsg,post._id)}/></Col>
                                                    <Col xs="1"> <MdDeleteOutline onClick={()=>handleDelete(post._id)}/></Col>
                                                </> : null}

                                        </Row>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>

                    )
                })
            }
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update Message</ModalHeader>
                <ModalBody>
                    <Input type="textarea" placeholder="Enter message here" value={postMsg} onChange={(e)=>setMsg(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{
                        if(postMsg=="")
                            alert("Enter Message...")
                        else{
                            toggle();
                            handleUpdate();
                        }
                       
                    }}>
                        UPDATE
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        CANCEL
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default Posts;