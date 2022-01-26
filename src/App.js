import './App.css';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function App() {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      cardNumber: '',
      age: ''
    }
  });
  
  const onSubmit = data => alert(JSON.stringify(data));
  
  return (
    <div className='App'>
      <header className='app-container'>
        React Hook Form
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-container'>
            <div className='form-column'>
              <div className='field-container'>
                <Controller
                  name='firstName' 
                  control={control} 
                  rules={{ required: 'This field is required.' }}
                  render={({ field }) => 
                    <TextField variant='filled' label={`First Name*`} {...field} />
                  } 
                  />
                <span className='error'>{errors.firstName?.message}</span>
              </div>
              <div className='field-container'>
                <Controller
                  name='cardNumber'
                  control={control}
                  rules={{ 
                    validate: {
                      isNumber: v => !isNaN(Number(v)) || 'Only numeric characters allowed.',
                      length: v => (v.length === 16 || v.length === 0) || 'The value must be 16 digits long.'
                    }
                  }}
                  render={({ field }) => 
                    <TextField variant='filled' label='Card Number' {...field} />
                  } 
                  />
                  <span className='error'>{errors.cardNumber?.message}</span>
              </div>
              <div className='field-container'>
                <Controller
                  name='phoneNumber' 
                  control={control} 
                  rules={{ 
                    required: 'This field is required.',
                    pattern: {
                      value: /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}$/,
                      message: 'Invalid phone number format.'
                    } 
                  }}
                  render={({ field }) => 
                    <TextField variant='filled' label='Phone Number*' {...field} />
                  } 
                  />
                <span className='error'>{errors.phoneNumber?.message}</span>
              </div>
            </div>

            <div className='form-column'>
              <div className='field-container'>
                <Controller
                  name='lastName' 
                  control={control} 
                  rules={{ required: 'This field is required.' }}
                  render={({ field }) => 
                    <TextField variant='filled' label='Last Name*' {...field} />
                  } 
                  />
                <span className='error'>{errors.lastName?.message}</span>
              </div>
              <div className='field-container'>
                <Controller
                  name='age'
                  control={control}
                  rules={{ }}
                  render={({ field }) => 
                    <TextField variant='filled' label='Age' {...field} />
                  } 
                  />
              </div>
              <div className='field-container'>
                <Controller
                  name='favoriteColor'
                  control={control}
                  render={({ field }) => 
                    <FormControl variant='filled' {...field}> 
                      <InputLabel>Favorite Color</InputLabel>
                      <Select defaultValue={''}>
                        <MenuItem onClick={() => setValue('favoriteColor', '')} value=''><em>None</em></MenuItem>
                        <MenuItem onClick={() => setValue('favoriteColor', 'blue')} value={'Blue'}>Blue</MenuItem>
                        <MenuItem onClick={() => setValue('favoriteColor', 'red')} value={'Red'}>Red</MenuItem>
                        <MenuItem onClick={() => setValue('favoriteColor', 'green')} value={'Green'}>Green</MenuItem>
                      </Select>
                    </FormControl>
                  }
                />
              </div>
            </div>
          </div>

          <Button className='submit' type='submit' variant='contained'>Submit</Button>
        </form>
      </header>
    </div>
  );
}