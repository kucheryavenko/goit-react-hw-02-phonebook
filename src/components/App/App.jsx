import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Section } from 'components/Section';
import { Title } from 'components/Title';
import { Container } from 'components/App/App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contact => {
    if (this.checkDublicate(contact)) {
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

  getVisibleContacts() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        number.includes(normalizedFilter);
      return result;
    });
    return visibleContacts;
  }

  changeFilter = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  checkDublicate({ name, number }) {
    const { contacts } = this.state;
    const result = contacts.find(
      contact => contact.name === name && contact.number === number
    );
    return result;
  }

  render() {
    const { addContact, deleteContact, changeFilter } = this;
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;

    return (
      <Container>
        <Title title={'Phonebook'} />
        <ContactForm addContact={addContact} />
        <Section title={'Contacts'}>
          <Filter value={filter} changeFilter={changeFilter} />
          <ContactList
            visibleContacts={visibleContacts}
            deleteContact={deleteContact}
          />
        </Section>
      </Container>
    );
  }
}
