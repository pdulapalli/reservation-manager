import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './viewer.css';

import { getInventoryForDate } from '../../../api/api';

export function InventoryViewer() {
  const [date, setDate] = useState('');

  const [invData, setInvData] = useState([]);

  return (
    <div className="inventory-viewer">
      <h1>Inventory Viewer</h1>
      <DatePickerField
        name="date"
        value={date}
        onChange={async (name, dateVal) => {
          setDate(dateVal);

          try {
            const inventory = await getInventoryForDate(dateVal);
            setInvData(inventory);
          } catch (err) {}
        }}
      ></DatePickerField>
      <InventoryTable
        data={invData}
      ></InventoryTable>
    </div>
  )
}

function InventoryTable({ data }) {
  return (
    data.length > 0 &&
    <div className="inventory-table">
      <table>
        <tbody>
        {
          <tr key='colnames'>
            <th>Timeslot</th>
            <th>Capacity</th>
            <th>Reservations</th>
          </tr>
        }
        {
          data.map(function(item, key) {
            return (
              <tr key = {key}>
                  <td>{item.timeslot}</td>
                  <td>{item.capacity}</td>
                  <td>{item.reservations}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

function DatePickerField({ name, value, onChange }) {
  return (
      <DatePicker
          dateFormat='yyyy-MM-dd'
          selected={
            function () {
              if (!value) {
                return new Date();
              }

              const [y,m,d] = value.split('-')
              return new Date(y,m-1,d);
            }()
          }
          onChange={val => {
              let valToSet = val;
              if (val) {
                valToSet = moment(val).format('YYYY-MM-DD');
              }

              onChange(name, valToSet);
          }}
      />
  );
}