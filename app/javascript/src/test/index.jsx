// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import Select from 'react-select'
import CountrySelector from './countrySelector';

const property_list = [
  { value: 'entire_apartment', label: 'Entire Apartment' },
  { value: 'room_in_apartment', label: 'Private Room In Apartment' },
  { value: 'entire_house', label: 'Entire House' },
  { value: 'room_in_house', label: 'Private Room In House' },
  { value: 'room_in_hotel', label: 'Room In Hotel' }
]

class Test extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      authenticated: false,
      user: '',
      title: '',
      description: '',
      city: '',
      country: '',
      property_type: '',
      price_per_night: '',
      max_guests: '',
      bedrooms: '',
      beds: '',
      baths: '',
      image: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
          user: data.username,
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSelectChange = (value, action) => {
    this.setState({
      [action.name]: value
    })
  }

  render () {

    const { authenticated, user, title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, image } = this.state;

    console.log(country);

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="title" className="" placeholder="Title" value={title} onChange={this.handleChange} required /> 
        <input type="textarea" name="description" className="" placeholder="Description" value={description} onChange={this.handleChange} required />
        <input type="text" name="city" className="" placeholder="City" value={city} onChange={this.handleChange} required />
        <CountrySelector name="country" value={country} onChange={this.handleSelectChange} required />
        <Select name="property_type" options={property_list} value={property_type} onChange={this.handleSelectChange} required />
        <input type="number" name="price_per_night" className="" placeholder="Price Per Night" value={price_per_night} onChange={this.handleChange} required /> 
        <input type="number" name="max_guests" className="" placeholder="Max Guests" value={max_guests} onChange={this.handleChange} required /> 
        <input type="number" name="bedrooms" className="" placeholder="Bedrooms" value={bedrooms} onChange={this.handleChange} required /> 
        <input type="number" name="beds" className="" placeholder="Beds" value={beds} onChange={this.handleChange} required />
        <input type="number" name="baths" className="" placeholder="Baths" value={baths} onChange={this.handleChange} required />
        <input type="submit" value="Submit" />
      </form>
    )


  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Test />,
    document.body.appendChild(document.createElement('div')),
  )
})



