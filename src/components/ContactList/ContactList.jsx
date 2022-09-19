export const ContactList = ({ visibleContacts, deleteContact }) => {
  return (
    <ul>
      {visibleContacts.map(({ id, name, number }) => (
        <li key={id}>
          <p>
            {name}: <span>{number}</span>
          </p>
          <button type="button" onClick={() => deleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
