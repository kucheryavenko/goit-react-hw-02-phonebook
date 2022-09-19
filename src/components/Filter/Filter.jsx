import { nanoid } from 'nanoid';

export const Filter = ({ value, changeFilter }) => {
  const searchId = nanoid();

  return (
    <>
      <label htmlFor={searchId}>Find contacts by name</label>
      <input
        id={searchId}
        type="text"
        name="filter"
        value={value}
        onChange={changeFilter}
      />
    </>
  );
};
