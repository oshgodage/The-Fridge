  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import AddItem from "./AddItem";
  //import DeleteItem from "./DeleteItem";
  import '../styles/style.scss'
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";

  function FridgeComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://thefridge-api.karapincha.io/fridge"
        );
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const getExpiryLabel = (expiryDate) => {
      const expiryDateObj = new Date(expiryDate);
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

      if (expiryDateObj < new Date()) {
        return "Expired";
      } else if (expiryDateObj < oneMonthFromNow) {
        return "Expiring soon";
      } else {
        return "Healthy";
      }
    };


    return (
      <div className="fridge-component">
            <h1 className="fridge-component__heading font-size-large custom-font3">Good Morning, Johny!</h1>
            <h2 className="fridge-component__subheading label-with-sun custom-font4 font-size-medium">
              It's better to go shopping before this friday
            </h2>
            <AddItem fetchData={fetchData} />
            {loading ? (
          <div className="spinner"></div>
        ) : (
            <div className="fridge-component__table-container">
              <table className="fridge-component__table">
                <thead>
                <tr>
                <th className="fridge-component__row__cell item-count" colSpan="4">
                  Total items - {data.length}
                </th>
              </tr>
                  <tr>
                    <th className="fridge-component__row__cell"></th>
                    <th className="fridge-component__row__cell"></th>
                    <th className="fridge-component__row__cell"></th>
                    <th className="fridge-component__row__cell"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr className="fridge-component__row" key={item.id}>
                      <td className="fridge-component__row__cell custom-font1 font-size-medium item-color">
                        {item.title}
                      </td>
                      <td className="fridge-component__row__cell custom-font5 font-size-small expiry-color">
                        Expiry Date - {item.expiry}
                      </td>
                      <td
                        className={`fridge-component__row__cell custom-font5 font-size-medium ${
                          getExpiryLabel(item.expiry) === "Expired"
                            ? "expired"
                            : getExpiryLabel(item.expiry) === "Expiring soon"
                            ? "expiring-soon"
                            : "healthy"
                        }`}
                      >
                        {getExpiryLabel(item.expiry)}
                      </td>
                      <td className="fridge-component__row__cell">
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="delete-icon"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
        )}
      </div>
    );
  }

  export default FridgeComponent;
