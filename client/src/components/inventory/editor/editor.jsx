import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InventoryForm } from './form';
import './style.css';

import { setInventory } from '../../../api/api';

export function InventoryEditor() {
  return (
    <div className='inventory-form'>
      <h1>Inventory Editor</h1>
      <Formik
        initialValues={{
          date: "",
          timeslot: "",
          capacity: 0,
        }}
        onSubmit={async values => {
          try {
            const result = await setInventory(values);
            if (result.success === false) {
              throw new Error('Not capable of completing inventory update');
            }

            alert('Inventory update was successful!');
          } catch (err) {
            alert('Unable to make inventory update');
          }
        }}
        validationSchema={Yup.object().shape({
          date: Yup.string()
            .required("Required"),
          timeslot: Yup.string()
            .required("Required"),
          capacity: Yup.number()
            .required("Required"),
        })}
      >
        {props => {
          return (
            <InventoryForm
              {...props}
            >
            </InventoryForm>
          );
        }}
      </Formik>
    </div>
  );
}