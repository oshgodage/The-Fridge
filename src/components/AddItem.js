    import React, { useState } from "react";
    import axios from "axios";
    import '../styles/style.scss'
    import DatePicker from "react-datepicker";
    import "react-datepicker/dist/react-datepicker.css";

    function AddItem({ fetchData }) {
    const [newItem, setNewItem] = useState({ title: "", expiry: null });
    const [validationError, setValidationError] = useState("");

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
        const formattedExpiry = newItem.expiry ? newItem.expiry.toISOString().split('T')[0] : '';
        if (newItem.title.trim() === "" || formattedExpiry.trim() === "") {
            setValidationError("Please fill in all the fields");
            return;
        }

        await axios.post("https://thefridge-api.karapincha.io/fridge", {
            title: newItem.title,
            expiry: formattedExpiry,
        });

        setNewItem({ title: "", expiry: null }); 
        setValidationError("");
        fetchData();
        } catch (error) {
        console.log(error);
        }
    };
    const clearSelectedDate = () => {
        setNewItem({ ...newItem, expiry: null }); 
    };

    return (
        <div className="form-container">
        <div className="form-style">
            <form id="itemForm" onSubmit={handleAddItem}>
            <div className="form-row">
                <div className="input-field">
                <label htmlFor="title" className="label-with-title custom-font4 font-size-medium">Title</label>
                <input
                    type="text"
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
                </div>
                <div className="input-field">
                <label htmlFor="expiry" className="label-with-date custom-font4 font-size-medium">Expiry Date </label>
                <DatePicker
                    id="expiry"
                    selected={newItem.expiry}
                    onChange={(date) => setNewItem({ ...newItem, expiry: date })}
                    dateFormat="yyyy/MM/dd"
                    onClick={clearSelectedDate}
                    value={newItem.expiry ? newItem.expiry.toISOString().split('T')[0] : ''}
                    defaultValue=""
                />
                </div>
            </div>
            <button type="submit" className="add-item__button custom-font1 font-size-medium">
                ADD TO FRIDGE
            </button>
            {validationError && <p className="add-item__error-message custom-font4 font-size-medium">{validationError}</p>}
            </form>
        </div>
        </div>
    );
    }

    export default AddItem;
