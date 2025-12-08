import renderer from 'react-test-renderer';
import reducer, {initVal,} from "../../features/UserSlice";
import Login from '../Login';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore=configureStore([]);
const store=mockStore({users:{
    user:{},
    message:"",
    isLoading:false,
    isSuccess:false,
    isError:false
}
})
const test_initval={
    user:{},
    message:"",
    isLoading:false,
    isSuccess:false,
    isError:false
}
test("Should return initial state", () => {
    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual(test_initval);
  });
  
  test("Checking the email format" , ()=>{
    render(
      <Provider store={store}>
        <Router>
          <Login/>
        </Router>

      </Provider >
    );
    const emailInput=screen.getByLabelText(/email/i);
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    fireEvent.change(emailInput,{target:{value:"abcxyz@gmail.edu"}});
    expect(regex.test(emailInput.value)).toBe(true);

   
  })


  test("Checking the email format" , ()=>{
    render(
      <Provider store={store}>
        <Router>
          <Login/>
        </Router>

      </Provider >
    );
 
    const PassInput=screen.getByLabelText(/password/i);
    const regex=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    fireEvent.change(PassInput,{target:{value:"Aa@909090"}});
    expect(regex.test(PassInput.value)).toBe(true);
  
   
  })


 