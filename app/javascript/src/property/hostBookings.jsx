// hostBookings.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors, safeCredentialsForm } from '@utils/fetchHelper';

class HostBookings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
    }

  }

  componentDidMount() {
  	fetch(`/api/properties/${this.props.propertyId}/host_bookings`)
     .then(handleErrors)
     .then(data => {
       this.setState({
         bookings: data.bookings,
       })
    })
  }

  render () {
  	const { bookings } = this.state

  	const {
      id,
      title,
      start_date,
      end_date,
    } = bookings

	const firstBooking = Array.isArray(bookings) && bookings.length ? bookings[0] : {};

	const headers = Object.keys(firstBooking);

    if (bookings.length) {
      return (
  	    <div className="container">
  	      <div className="row my-2">
  	        <h3>Upcoming Bookings</h3>
  	      </div>

  	      <div className="row my-2">
  		      <table className="table">
  		      	<thead className="thead-dark">
  		          <tr>
  		            { headers.map(header => <th key={header}>{header}</th>) }
  		          </tr>
  		        </thead>
  		        <tbody>
  			        { bookings.map((booking, index) => {
  			          return <tr key={"br-" + index}>{ headers.map( header => <td key={"bc-" + index + booking[header]}>{(header === "Paid?") ? (booking[header] ? "Paid" : "Not Paid") : booking[header]}</td>) }</tr>
  			        }) }
  		        </tbody>
  		      </table>
  	      </div>
  	    </div>
      )
    }
    return (
      <div className="container">
        <div className="row my-2">
          <h3>No Upcoming Bookings</h3>
        </div>
      </div>
    )
  }
}

export default HostBookings