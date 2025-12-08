import {useDispatch,useSelector} from 'react-redux';

const User=()=>{
    const uname=useSelector((state)=>state.users.user.uname);
    const profilepic=useSelector((state)=>state.users.user.profilepic);
    const def_pic="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg";
    return(
        <div style={{textAlign:'center'}}>
            <img src={profilepic?profilepic:def_pic} className='profilepic'/>
            <h1>{uname}</h1>
        </div>
    )
}
export default User;