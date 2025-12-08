import { Col, Container, Row } from "reactstrap";
import User from "./User";
import SharePost from "./SharePost";
import Posts from "./Posts";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home=()=>{
    const email=useSelector((state)=>state.users.user.email);
    const navigate=useNavigate();

    useEffect(()=>{
        if(!email)
            navigate("/");
    },[email]);

    return(
        <Container fluid>
            <Row>
                <Col md='3'>
                    <User/>
                </Col>
                <Col>
                    <Row>
                        <SharePost/>
                    </Row>
                    <Row>
                        <Posts/>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default Home;