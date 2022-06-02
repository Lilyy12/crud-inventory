import './App.css';
import React, { useState } from "react";
import Axios from 'axios';

 function Location() {

    const [inventoryName, setInventoryName] = useState("");
    const [location, setlocation] = useState("");
    const [inventoryList, setInventoryList] = useState([]);

    //add info about Inventory and warehouse location to location table:
    const addLocation = () => {
        Axios.post('https://git.heroku.com/crud-inventory-tracker1.git/create/location', {
            inventoryName: inventoryName,
            location: location
        }).then((() => {
            console.log("add location success");
        }))
    }

    //get inventory from inventory table and fetch it to radio list:
    const getInventory = () => {
        Axios.get("https://git.heroku.com/crud-inventory-tracker1.git/inventory").then((response) => {
          setInventoryList(response.data);
        });
      }

    //grab inventory value from radio button
    const handleInventory = event => {
        setInventoryName(event.target.value);
    }

    //grab location value from radio button
    const handleLocation = event => {
        setlocation(event.target.value);
    }

    
    return (
        <div>
                <label><b>Inventory Name</b></label><br/>
                <button onClick={getInventory}>update radio button from db</button>
                {inventoryList.map((val,key) => {
                    return (
                        <tr>
                            <td>
                                <input 
                                type="radio" 
                                name="inventory" 
                                value={val.inventoryName} 
                                onChange={handleInventory}
                                /> {val.inventoryName}
                            </td>
                        </tr>
                    )
                })}
                
                <br/><label><b>Warehouse Location</b></label> <br/>
                <tr>
                    <td>
                        <input type="radio" name="location" value="london" onChange={handleLocation} />London <br/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="location" value="edinburgh" onChange={handleLocation} />Edinburgh <br/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="location" value="other" onChange={handleLocation} />Other <br/>
                    </td>
                </tr>
                <button onClick={addLocation}>Submit</button>
        </div>
    )
 }

 export default Location;