import './App.css';
import React, { useState } from "react";
import Axios from 'axios';


function Home() {

  const [inventoryName, setInventoryName] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [inventoryList, setInventoryList] = useState([]);

  const [newQuantity, setNewQuantity] = useState(0);

  const addInventory = () => {
    Axios.post('https://crud-inventory-tracker1.herokuapp.com/create', {
      inventoryName: inventoryName,
      name: name,
      category: category,
      unitPrice: unitPrice,
      quantity: quantity
    }).then((() => {
      console.log("success");
    }));
  };

  const getInventory = () => {
    Axios.get("https://crud-inventory-tracker1.herokuapp.com/inventory").then((response) => {
      setInventoryList(response.data);
    });
  }

  const updateQuantity = (id) => {
    Axios.put("https://crud-inventory-tracker1.herokuapp.com/update", {quantity: newQuantity, id: id}).then((response) => {
      setInventoryList(inventoryList.map((val) => {
        return val.id === id ? {
          id: val.id, 
          inventoryName: val.inventoryName, 
          name: val.name, 
          category: val.category, 
          unitPrice: val.unitPrice, 
          quantity: newQuantity
          } 
        : val
      }))
    })
  };

  const deleteInventory = (id) => {
    Axios.delete(`https://crud-inventory-tracker1.herokuapp.com/delete/${id}`).then((response) => {
      setInventoryList(
        inventoryList.filter((val) => {
          return val.id !== id;
      }));
    });
  };


  return (
    <div className="App">
      <div className="information">
        <label>Inventory ID:</label>
        <input type ="text" onChange={(event) => {
          setInventoryName(event.target.value);
          }} />
        <label>Name:</label>
        <input type ="text" onChange={(event) => {
          setName(event.target.value);
          }} />
        <label>Category:</label>
        <input type ="text" onChange={(event) => {
          setCategory(event.target.value);
          }} />
        <label>Unit Price:</label>
        <input type ="number" onChange={(event) => {
          setUnitPrice(event.target.value);
          }} />
        <label>Quantity in stock:</label>
        <input type ="number" onChange={(event) => {
          setQuantity(event.target.value);
          }} />
        <button onClick={addInventory}>Add Inventory</button>
      </div>
      <div className="inventory">
        <button onClick={getInventory}>Show Inventory List</button>
        <table className="table">
        <tr>
          <th>Inventory Name</th>
          <th>Name</th>
          <th>Category</th>
          <th>Unit Price</th>
          <th>Quantity in stock</th>
          <th>Action</th>
        </tr>

        {inventoryList.map((val,key) => {
          return (
            <tr>
              <td>{val.inventoryName}</td> 
              <td>{val.name}</td> 
              <td>{val.category}</td> 
              <td>{val.unitPrice}</td> 
              <td>{val.quantity}</td> 
              <td>
              <button onClick={ () => {
                deleteInventory(val.id);
              }}>Delete</button>
              <div className='update'>
                <input type="number" placeholder="update quantity here ..." onChange={(event) => {
                setNewQuantity(event.target.value);
                }}/>
                <button 
                  onClick={() => {
                    updateQuantity(val.id);
                    }}>Update</button>
              </div>
              </td>
              </tr>)
        })}
        </table>
        
      </div>
    </div>
  );
}

export default Home;
