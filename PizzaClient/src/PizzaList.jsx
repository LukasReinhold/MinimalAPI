import { useState, useEffect } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function PizzaList({ name, data, onCreate, onUpdate, onDelete, error }) {

  console.log(`PizzaList: ${JSON.stringify(data)}`);

  const [formData, setFormData] = useState({ id: '', name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (editingId === null) {
      setFormData({ id: '', name: '', description: '' });
    } else {
      const currentItem = data.find(item => item.id === editingId);
      setFormData(currentItem);
    }
  }, [editingId, data]);

  const handleFormChange = (event) => {

    console.log(`handleFormChange: ${event.target.name} ${event.target.value}`)

    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`formData: ${JSON.stringify(formData)}`)

    if (editingId !== null) {
      console.log(`update item: ${JSON.stringify(formData)}`)
      onUpdate(formData);
    } else {
      onCreate(formData);
    }

    setFormData({ id: '', name: '', description: '' });
    setEditingId(null);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setFormData({ id: '', name: '', description: '' });
    setEditingId(null);
  };



return(<div>
      <h2>New {name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleFormChange}
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
      </form>
      {error && <div>{error.message}</div>}
      <h2>{name}s</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <div>{item.name} - {item.description}</div>
            <div><button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button></div>
          </li>
        ))}
      </ul>
    </div>);
}

export default PizzaList;