/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";

import moment from 'moment';

import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

export function InventoryForm({
  dirty,
  isSubmitting,
  handleReset,
  setFieldValue,
  values,
}) {

  return (
    <>
      <Form>
        <label htmlFor="date">Date</label>
        <DatePickerField
          name="date"
          value={values.date}
          onChange={setFieldValue}
        />
        <ErrorMessage name="date" component="div" className="form-error-message" />

        <label htmlFor="timeslot">Time</label>
        <TimePickerField
          name="timeslot"
          value={values.timeslot}
          format='HHmm'
          onChange={setFieldValue}
        />
        <ErrorMessage name="timeslot" component="div" className="form-error-message" />

        <label htmlFor="capacity">Capacity</label>
        <Field type="number" name="capacity" min={0} />
        <ErrorMessage name="capacity" component="div" className="form-error-message" />

        <div>
          <button
            type="button"
            className="outline"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </button>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </Form>
    </>
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

function TimePickerField({ name, format, onChange }) {
  return (
      <TimePicker
          placeholder="0000"
          minuteStep={15}
          format={format}
          showSecond={false}
          hideDisabledOptions={true}
          onChange={val => {
              let valToSet = val;
              if (val) {
                valToSet = val.format(format);
              }

              onChange(name, valToSet);
          }}
      />
  );
}