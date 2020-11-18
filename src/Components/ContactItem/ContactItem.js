import React from 'react';
import styles from './ContactItem.module.css'
import PropTypes from "prop-types";
// import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ContactItem = ({ id, name, number, removeContact }) => {
  return (
    <li className={styles.contactItem}>
      <p className={styles.paragraph}>{name}: {number}</p>
      <button
        className={styles.removeBtn}
        type="button"
        onClick={(e) => {
          removeContact(id);
        }}>
        X
      </button>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string,
  removeContact: PropTypes.func.isRequired
}