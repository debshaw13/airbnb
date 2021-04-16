//index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors, safeCredentialsForm } from '@utils/fetchHelper';

class Bookings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
    }

  }

  componentDidMount() {
  	fetch(`/api/properties/guest_bookings`)
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

	console.log(firstBooking);

	const paymentButton = <button className="btn btn-primary">Pay Now</button>;

    return (
      <Layout>
        <div className="container">
          <div className="row my-2">
            <h3>My bookings</h3>
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
			          return <tr key={"br-" + index}>{ headers.map( header => <td key={"bc-" + index + booking[header]}>{(header === "Paid?") ? (booking[header] ? "Paid" : paymentButton) : booking[header]}</td>) }</tr>
			        }) }
		        </tbody>
		      </table>
          </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Bookings property_id={data.property_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})
