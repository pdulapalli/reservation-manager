/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";
import Select from 'react-select'

import moment from 'moment';

import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

import { getDisallowedTimeslots } from '../../api/api';

export function ReservationForm({
  dirty,
  isSubmitting,
  handleReset,
  setFieldValue,
  values,
}) {
  const [timesToDisable, setTimesToDisable] = useState([]);

  return (
    <>
      <Form>
        <label htmlFor="name">Name</label>
        <Field type="text" name="name" />
        <ErrorMessage name="name" component="div" className="form-error-message" />

        <label htmlFor="email">Email</label>
        <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" className="form-error-message" />

        <label htmlFor="partySize">Party Size</label>
        <NumSelectorField
          name="partySize"
          value={values.partySize}
          onChange={setFieldValue}
          size={10}
        ></NumSelectorField>
        <ErrorMessage name="partySize" component="div" className="form-error-message" />

        <label htmlFor="date">Date</label>
        <DatePickerField
          name="date"
          value={values.date}
          onChange={async (name, val) => {
            setFieldValue(name, val);
            const disallowed = await getDisallowedTimeslots(val);
            setTimesToDisable(disallowed);
          }}
        />
        <ErrorMessage name="date" component="div" className="form-error-message" />

        <label htmlFor="timeslot">Time</label>
        <TimePickerField
          name="timeslot"
          value={values.timeslot}
          format='HHmm'
          onChange={setFieldValue}
          timesToDisable={timesToDisable}
        />
        <ErrorMessage name="timeslot" component="div" className="form-error-message" />

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

function computeTimeCombosToDisable(timesToDisable) {
  if (!timesToDisable ||
    !Array.isArray(timesToDisable)) {
    return {};
  }

  const slotsByHour = {};

  for (let i = 0; i < timesToDisable.length; i += 1) {
    const timestr = timesToDisable[i];
    const hour = timestr.slice(0, 2);
    const minute = timestr.slice(2);
    const prevSlots = slotsByHour[hour];
    const slots = (Array.isArray(prevSlots) ? prevSlots : []).concat([minute]);
    slotsByHour[hour] = slots;
  }

  return slotsByHour;
}

function TimePickerField({ name, format, onChange, timesToDisable }) {
  const slotsByHour = computeTimeCombosToDisable(timesToDisable);

  return (
      <TimePicker
          placeholder="0000"
          minuteStep={15}
          format={format}
          showSecond={false}
          hideDisabledOptions={true}
          disabledHours={() => {
            const hoursToDisable = [];
            for (const key in slotsByHour) {
              const slots = slotsByHour[key];
              if (slots.length === 4) {
                hoursToDisable.push(key);
              }
            }

            return hoursToDisable.map(el => Number.parseInt(el, 10));
          }}
          disabledMinutes={(hour) => {
            if (typeof hour === 'undefined' ||
              hour === null) {
              return [];
            }

            let hourStr = hour.toString();
            if (hourStr.length === 1) {
              hourStr = '0' + hourStr;
            }

            const disabled = slotsByHour[hourStr] || [];
            return disabled.map(el => Number.parseInt(el, 10));
          }}
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

function NumSelectorField({ name, value, onChange, size }) {
  const options = Array.from({ length: size }, (e, i) => i + 1)
    .map((num) => {
      return {
        value: num,
        label: num,
      };
    });

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted black',
      color: state.isSelected ? 'black' : 'gray',
    }),
    container: provided => ({
      ...provided,
      width: 100
    }),
  }

  return (
    <Select
      styles={customStyles}
      // style={{width: '30%'}}
      options={options}
      value={{
        value: value,
        label: value,
      }}
      onChange={valObj => {
        onChange(name, valObj.value);
      }}
    />
  );
}