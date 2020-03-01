import React, {Component} from 'react';
import Button from '../../../coponents-stateLess/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
            city: ''
        }
    }

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Wprowadź swoje dane kontaktowe</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Twoje Imie' />
                    <input className={classes.Input} type='email' name='email' placeholder='Twój email' />
                    <input className={classes.Input} type='text' name='ulica' placeholder='Twoja ulica' />
                    <input className={classes.Input} type='text' name='kod-pocztowy' placeholder='kod-pocztowy' />
                    <input className={classes.Input} type='text' name='miejscowość' placeholder='miejscowość' />
                    <Button btnType='Success'>Zamówienie</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;