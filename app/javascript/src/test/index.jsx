// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import Select from 'react-select'
import countryList from 'react-select-country-list'

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

  render () {
    const { authenticated, user, title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, image } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="title" className="" placeholder="Title" value={title} onChange={this.handleChange} required /> 
        <input type="textarea" name="description" className="" placeholder="Description" value={description} onChange={this.handleChange} required />
        <input type="text" name="city" className="" placeholder="City" value={city} onChange={this.handleChange} required />
        <select name="country" className="" value="USA" onChange={this.handleChange} required />
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



