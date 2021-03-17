import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ReservationForm } from './form';
import './style.css';

import { makeReservation } from '../../api/api';

export function Reservation() {
  return (
    <div className='reservation-form'>
      <h1>Reservation</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          partySize: 1,
          date: "",
          timeslot: ""
        }}
        onSubmit={async values => {
          try {
            const result = await makeReservation(values);
            if (result.success === false) {
              throw new Error('Not capable of completing reservation');
            }

            alert('Reservation was successful!');
          } catch (err) {
            alert('Unable to make reservation');
          }
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Required"),
          email: Yup.string()
            .email()
            .required("Required"),
          partySize: Yup.number()
            .min(1)
            .required("Required"),
          date: Yup.string()
            .required("Required"),
          timeslot: Yup.string()
            .required("Required"),
        })}
      >
        {props => {
          return (
            <ReservationForm
              {...props}
            >
            </ReservationForm>
          );
        }}
      </Formik>
    </div>
  );
}