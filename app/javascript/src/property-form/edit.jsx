// edit.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors, safeCredentialsForm } from '@utils/fetchHelper';
import Select from 'react-select'
import CountrySelector from './countrySelector';
import property_list from './property_list';

class EditProperty extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      authenticated: false,
      user: '',
      id: '',
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
      images: '',
    }

  }

  componentDidMount() {
  	checkAuthenticated();
  	fetchProperty();
  }

  checkAuthenticated() {
	fetch('/api/authenticated')
	 .then(handleErrors)
	 .then(data => {
	   this.setState({
	     authenticated: data.authenticated,
	     user: data.username,
	   })
	 })
  }

  fetchProperty() {
    fetch(`/api/properties/${props.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
	      id = data.property.id,
	      title = data.property.title,
	      description = data.property.description,
	      city = data.property.city,
	      country = data.property.country,
	      property_type = data.property.property_type,
	      price_per_night = data.property.price_per_night,
	      max_guests = data.property.max_guests,
	      bedrooms = data.property.bedrooms,
	      beds = data.property.beds,
	      baths = data.property.baths,
	      image_url = data.property.image_url,

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
      [action.name]: value.label
    })
  }

  handleSubmit = (event) => {
    if (event) { event.preventDefault(); }
    this.setState({
      error: '',
    });

    let formData = new FormData();
    let fileInputElement = document.getElementById('fileInput');
    for (let i = 0; i < fileInputElement.files.length; i++) {
      formData.append('property[images][]', fileInputElement.files[i]);
    }
    // Set other params in the form data.
    formData.set('property[title]', this.state.title);
    formData.set('property[description]', this.state.description);
    formData.set('property[city]', this.state.city);
    formData.set('property[country]', this.state.country);
    formData.set('property[property_type]', this.state.property_type);
    formData.set('property[price_per_night]', this.state.price_per_night);
    formData.set('property[max_guests]', this.state.max_guests);
    formData.set('property[bedrooms]', this.state.bedrooms);
    formData.set('property[beds]', this.state.beds);
    formData.set('property[baths]', this.state.baths);


    fetch('/api/properties', safeCredentialsForm({
      method: 'POST',
      body: formData,
    })).then(handleErrors)
      .then(data => {
        if (data.property) {
          window.location = '/property/' + data.property.id;
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not create property.',
        })
      })
  }

  render () {

    const { authenticated, id, user, title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, images } = this.state;

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <h3>Edit property</h3>
         </div>

          <div className="row">
            <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
              <div className="col-12 my-2">
                <input type="text" name="title" className="form-control" placeholder="Title" value={title} onChange={this.handleChange} required />
              </div>
              <div className="col-12 my-2">
                <input type="textarea" name="description" className="form-control" placeholder="Description" value={description} onChange={this.handleChange} required />
              </div>
              <div className="col-12 my-2">
                <input type="text" name="city" className="form-control" placeholder="City" value={city} onChange={this.handleChange} required />
              </div>
              <div className="col-12 my-2">
                <CountrySelector name="country" value={country} onChange={this.handleSelectChange} required />
              </div>
              <div className="col-12 my-2">
                <Select name="property_type" options={property_list} value={property_list.filter(option => option.label === property_type)} onChange={this.handleSelectChange} required />
              </div>
              <div className="col-12 my-2">
                <input type="number" name="price_per_night" className="form-control" placeholder="Price Per Night" value={price_per_night} onChange={this.handleChange} required /> 
              </div>
              <div className="col-12 my-2">
                <input type="number" name="max_guests" className="form-control" placeholder="Max Guests" value={max_guests} onChange={this.handleChange} required /> 
              </div>
              <div className="col-12 my-2">
                <input type="number" name="bedrooms" className="form-control" placeholder="Bedrooms" value={bedrooms} onChange={this.handleChange} required /> 
              </div>
              <div className="col-12 my-2">
                <input type="number" name="beds" className="form-control" placeholder="Beds" value={beds} onChange={this.handleChange} required />
              </div>
              <div className="col-12 my-2">
                <input type="number" name="baths" className="form-control" placeholder="Baths" value={baths} onChange={this.handleChange} required />
              </div>
              <div className="col-12 my-2">
                <input type="file" name="images" onChange={this.handleChange} id="fileInput" />
              </div>
              <div className="col-12 my-4">
                <input type="submit" className="btn btn-primary" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    )


  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EditProperty />,
    document.body.appendChild(document.createElement('div')),
  )
})

