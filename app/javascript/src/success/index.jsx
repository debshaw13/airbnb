//index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors, safeCredentialsForm } from '@utils/fetchHelper';

class Success extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      booking: [],
      booking_title: [],
      booking_values: [],
    }

  }

  componentDidMount() {
    fetch(`/api/bookings/${this.props.bookingId}`)
     .then(handleErrors)
     .then(data => {
       this.setState({
         booking: data.booking,
         booking_title: Object.keys(data.booking),
         booking_values: Object.values(data.booking),
       })
    })
  }

  render () {
    const { booking, booking_title, booking_values } = this.state;

    return (
      <Layout>
        <div className="container">
          <div className="row my-2">
            <h3>Your Booking Is Complete!</h3>
          </div>

          <div className="row my-2">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  { booking_title.map(detail => <th key={detail}>{detail}</th>) }
                </tr>
              </thead>
              <tbody>
                <tr>{ booking_values.map((detail, index) => <td key={"br-" + index}>{detail}</td>) }</tr>
              </tbody>
            </table>
          </div>

          <div className="row my-2">
            <p>Thank you for booking with Airbnb. Enjoy your stay at { booking.Title } in { booking.City }!</p>
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
    <Success bookingId={data.booking_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})
