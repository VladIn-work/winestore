import React, {useState} from "react";
import { Container, Form } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {savePayment} from "../actions/cartActions";

export const PaymentView = (props) => {
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;
    if(!userInfo) {
        props.history.push('/login')
    }
    const [payment, setPayment] = useState('ApplePay');

    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(savePayment(payment));
        props.history.push('placeorder');
    }
    return (
     <Container>
         <Form className="form" onSubmit={submitHandler}>
             <div>
                 <h2 className="form-header">Select Payment</h2>
             </div>
             <div className="form-groups">
                 <input
                     type="radio"
                     id="apple"
                     value="ApplePay"
                     name="paymentMethod"
                     required
                     checked
                     onChange={(evt) =>setPayment(evt.target.value)}
                 >
                 </input>
                 <label htmlFor="apple" className="form-label">Apple Pay</label>
             </div>
             <div className="form-groups">
                 <input
                      type="radio"
                      id="paypal"
                      value="PayPal"
                      name="paymentMethod"
                      required
                      onChange={(evt) =>setPayment(evt.target.value)}
                 >
                 </input>
                 <label htmlFor="paypal" className="form-label">PayPal</label>
             </div>
             <div className="form-groups">
                 <input
                       type="radio"
                       id="google"
                       value="GooglePay"
                       name="paymentMethod"
                       required
                       onChange={(evt) =>setPayment(evt.target.value)}
                 >
                 </input>
                 <label htmlFor="google" className="form-label">Google Pay</label>
             </div>
             <div>
                 <button className="form-note-button" type="submit">Continue</button>
             </div>
         </Form>

     </Container>
    )
};