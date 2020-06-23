import React, { useState } from 'react';
import CheckoutSummary from '../../coponents-stateLess/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { terms } from '../../regulations/terms-of-use';
import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import Button from '../../coponents-stateLess/UI/Button/Button';

const Checkout = props => {

    const [showModal, setShowModal] = useState(false);

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    let summary = <Redirect to="/"/>
    //console.log('Render Checkout.js : Ingredients :: ',this.state.ingredients)
    if(props.ings){
        //console.log('Path=',this.props.match)
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <Modal show={showModal} modalClosed={setShowModal.bind(this,false)}>
                    { terms }
                    <center>
                        <Button 
                            btnType="Success" 
                            clicked={setShowModal.bind(this,false)}
                        >
                            OK
                        </Button>
                    </center>
                </Modal>
                <CheckoutSummary 
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} 
                />
                <Route 
                    path={props.match.path + '/contact-data'} 
                    render={(props) => <ContactData {...props} showRules={setShowModal.bind(this,true)} />}
                />
            </div>
        );
    };
    
    return summary;
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);