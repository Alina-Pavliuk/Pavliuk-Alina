import React, { Component } from 'react';
import styles from './ContactForm.module.css';
import PropTypes from "prop-types";

const initialState = {
  number: "",
  name: "",
}

class ContactForm extends Component {

  state = {
    number: "",
    name: "",
  }

  handlerInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    })
  }

  submitHandler = (e) => {
    const { name, number } = this.state
    e.preventDefault();
    const singleContact = {
      name,
      number,

    }
    this.props.addContact(singleContact)
    this.setState({ ...initialState })
  }

  render() {
    const { number, name } = this.state
    return (
      <form className={styles.ContactForm} onSubmit={this.submitHandler}>
        <label>
          <span className={styles.titleLabel}>Name</span>
          <input
            className={styles.inputForm}
            type="text"
            value={name}
            name="name"
            placeholder="Name"
            onChange={this.handlerInput}
          />
        </label>
        <label>
          <span className={styles.titleLabel}> Number</span>
          <input
            className={styles.inputForm}
            type="text"
            value={number}
            name="number"
            placeholder="Number"
            onChange={this.handlerInput}
          />
        </label>
        <button className={styles.formButton} type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  addContact: PropTypes.func.isRequired
}