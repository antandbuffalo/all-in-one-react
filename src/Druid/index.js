import React from "react";
import "./Druid.css";

const Druid = () => {
  const insert = () => {
    const time = document.getElementById("time").value;
    const grossSales = document.getElementById("grossSales").value;
    const netSales = document.getElementById("netSales").value;
    const numOfTransactions = document.getElementById("numOfTransactions").value;
    const payStoreGrabId = document.getElementById("payStoreGrabId").value;
    const ratingCount = document.getElementById("ratingCount").value;
    const ratingSum = document.getElementById("ratingSum").value;

    const requestData = {
      "type": "index_parallel",
      "spec": {
        "ioConfig": {
          "type": "index_parallel",
          "inputSource": {
            "type": "inline",
            "data": "{\"gross_sales\":35.345,\"net_sales\":333.4,\"num_transactions\":94,\"pay_store_grab_id\":\"e5636487-f1ca-45c1-8d28-74ca73a5f8c2\",\"rating_count\":3,\"rating_sum\":5}"
          },
          "inputFormat": {
            "type": "json"
          },
          "appendToExisting": true
        },
        "tuningConfig": {
          "type": "index_parallel",
          "partitionsSpec": {
            "type": "dynamic"
          }
        },
        "dataSchema": {
          "dataSource": "transactions_daily",
          "timestampSpec": {
            "column": "!!!_no_such_column_!!!",
            "missingValue": "2022-11-25T00:00:00Z"
          },
          "dimensionsSpec": {
            "dimensions": [
              {
                "type": "double",
                "name": "gross_sales"
              },
              {
                "type": "double",
                "name": "net_sales"
              },
              {
                "type": "BIGINT",
                "name": "num_transactions"
              },
              "pay_store_grab_id",
              {
                "type": "BIGINT",
                "name": "rating_count"
              },
              {
                "type": "BIGINT",
                "name": "rating_sum"
              }
            ]
          },
          "granularitySpec": {
            "queryGranularity": "none",
            "rollup": false
          }
        }
      }
    }

    postData("/druid/indexer/v1/task", requestData)
      .then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
      });

  }

  async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(response);
    //return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <div>
      <div className="field-container">
        <div className="field">Time:</div><input type="text" id="time" /> (Date: 2022-12-02T00:00:00.000Z)
      </div>
      <div className="field-container"> <div className="field">gross_sales: </div><input type="text" id="grossSales" /> (Number: 345.45)</div>
      <div className="field-container"><div className="field">net_sales: </div><input type="text" id="netSales" /> (Number: 45.45)</div>
      <div className="field-container"><div className="field">num_transactions: </div><input type="text" id="numOfTransactions" /> (Number: 45) </div>
      <div className="field-container"><div className="field">pay_store_grab_id: </div><input type="text" id="payStoreGrabId" /> (String: "e5636487-f1ca-45c1-8d28-74ca73a5f8c2")
      </div>
      <div className="field-container"><div className="field">rating_count: </div><input type="text" id="ratingCount" /> (Number: 3)</div>
      <div className="field-container"><div className="field">rating_sum: </div><input type="text" id="ratingSum" /> (Number: 5)</div>
      <br />
      <div className="field-container"><button onClick={insert}>Insert</button></div>
    </div>
  );
}

export default Druid;