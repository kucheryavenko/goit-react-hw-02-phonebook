import React, { Component } from 'react';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  nameId = nanoid();
  numberId = nanoid();

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    this.addContact({ name, number });
    this.reset();
  };

  addContact = contact => {
    if (this.isDublicate(contact)) {
      return alert(`${contact.name} is already in contacts.`);
    }
    this.setState(prevState => {
      const newContacts = {
        id: nanoid(),
        ...contact,
      };
      return {
        contacts: [newContacts, ...prevState.contacts],
      };
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(
        contact => contact.id !== id
      );
      return {
        contacts: newContacts,
      };
    });
  };

  handleChangeFilter = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  getFilterContacts() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        number.includes(normalizedFilter);
      return result;
    });
    return filteredContacts;
  }
  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const result = contacts.find(
      contact => contact.name === name && contact.number === number
    );
    return result;
  }

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { nameId, numberId } = this;
    const contacts = this.getFilterContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={nameId}>Name</label>
          <input
            id={nameId}
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
          <label htmlFor={numberId}>Number</label>
          <input
            id={numberId}
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Add contact</button>
        </form>
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <input
          type="text"
          name="filter"
          value={this.state.filter}
          onChange={this.handleChangeFilter}
        />
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              <p>
                {contact.name}: <span>{contact.number}</span>
              </p>
              <button
                type="button"
                onClick={() => this.deleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
