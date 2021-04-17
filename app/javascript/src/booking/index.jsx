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

    this.initiateStripeCheckout = this.initiateStripeCheckout.bind(this);
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

  initiateStripeCheckout = (booking_id) => {
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe('pk_test_xurXA5P3oHIpjdDaLO0RajsJ');

        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render () {
  	const { bookings } = this.state

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
                <th>Property</th><th>Start</th><th>End</th><th>Paid?</th>
		          </tr>
		        </thead>
		        <tbody>
			        { bookings.map((booking, index) => {
			          return(<tr key={"br-" + index}>
                  <td>{booking["Property"]}</td>
                  <td>{booking["Start"]}</td>
                  <td>{booking["End"]}</td>
                  <td>{booking["Paid?"] ? "Paid" : <button onClick={(e) => this.initiateStripeCheckout(booking["Id"])} className="btn btn-primary">Pay Now</button>}</td>
                </tr>)
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
