import { useState } from 'react';

const CRUDView = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (input.trim()) {
      setItems([...items, input]);
      setInput('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setInput(items[index]);
  };

  const handleUpdate = () => {
    const newItems = [...items];
    newItems[editIndex] = input;
    setItems(newItems);
    setEditIndex(null);
    setInput('');
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Vista CRUD</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      {editIndex !== null ? (
        <button onClick={handleUpdate}>Actualizar</button>
      ) : (
        <button onClick={handleAdd}>Agregar</button>
      )}

      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item}
            <button onClick={() => handleEdit(i)}>Editar</button>
            <button onClick={() => handleDelete(i)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUDView;
