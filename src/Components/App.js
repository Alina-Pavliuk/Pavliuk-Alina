import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import stylesApp from './App.module.css';
import styles from './ContactItem/ContactItem.module.css';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactItem from '../Components/ContactItem/ContactItem';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    start: false,
    alert: false
  }

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      })
    }
    this.setState({ start: true })
  }
  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }


  addContact = (contactObj) => {
    if (this.state.contacts.some(el => el.name === contactObj.name)) {
      // alert(`${contactObj.name} is already contacts`);
      this.setState({ alert: true })
      return;
    }

    this.setState((prev) => ({
      contacts: [{ ...contactObj, id: uuidv4() }, ...prev.contacts]
    }));

  };

  removeContact = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter(el => el.id !== id)
    }));
  }

  filterHandler = (e) => {
    this.setState({ filter: e.target.value });
  }

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  }

  deleteAlert = () => {
    this.setState({ alert: false })
  }

  render() {
    const { contacts, filter, start, alert } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <div className={stylesApp.wrapper}>
        <CSSTransition classNames={{
          enterActive: stylesApp.alertBoxEnterActive,
          exitActive: stylesApp.alertBoxExitActive
        }}
          mountOnEnter
          unmountOnExit
          timeout={300}
          in={alert}>
          <div className={stylesApp.alertBox}>
            <h2>{`The name is already a contact`}</h2>
            <button
              onClick={this.deleteAlert}
              className={styles.alertBtn}
              type="button"
            >X
              </button>
          </div>
        </CSSTransition>
        <CSSTransition classNames={{
          enterActive: stylesApp.titleEnterActive,
        }} timeout={800} in={start}>
          <h2 className={stylesApp.title}>Phonebook </h2>
        </CSSTransition>


        <ContactForm contacts={contacts} addContact={this.addContact} />
        <Filter filter={filter} filterHandler={this.filterHandler} />

        <TransitionGroup className={stylesApp.contactsList} component="ul">
          {filteredContacts.map(contact =>
            <CSSTransition
              key={contact.id}
              timeout={700}
              classNames={{
                enterActive: styles.listItemEnterActive,
                exitActive: styles.listItemExitActive,
              }}
            >
              <ContactItem {...contact} removeContact={this.removeContact} />
            </CSSTransition>
          )}

        </TransitionGroup>

      </div>
    );
  }
}

export default App;
