import React from "react";
import axios from "axios";

function DeleteItem({ itemId, fetchData }) {
  const handleDeleteItem = async () => {
    try {
      await axios.delete(`https://thefridge-api.karapincha.io/fridge/${itemId}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleDeleteItem}>Delete</button>;
}

export default DeleteItem;
