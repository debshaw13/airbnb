// layout.js
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session_user: '',
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          session_user: data.username,
        })
      })
  }

  signOut = (e) => {
    fetch(`/api/sessions`, safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(data => {
       window.location.href = "/";
    })
  }
  render () {

    const { session_user } = this.state;

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              { session_user &&
                <li className="nav-item">
                  <a className="nav-link" href="/properties/new">Create a Property</a>
                </li>
              }
              { session_user && session_user === this.props.property_user &&
                <li className="nav-item">
                  <a className="nav-link" href={"/properties/" + this.props.property_id + "/edit"}>Edit Property</a>
                </li>
              }
              { session_user &&
                <li className="nav-item">
                  <a className="nav-link" href={"/bookings"}>My Bookings</a>
                </li>
              }
            </ul>
          </div>
          <ul className="navbar-nav">
            { session_user &&
              <li className="nav-item">
                <a className="nav-link" onClick={this.signOut} href="">Logout</a>
              </li>
            }
            { !session_user &&
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
            }
          </ul>

        </nav>
        {this.props.children}
        <footer className="p-3 bg-light">
          <div>
            <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Layout;