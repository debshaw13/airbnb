//index.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import New from './new';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  let data;
  if (node.getAttribute('data-params')) {
  	data = JSON.parse(node.getAttribute('data-params'));
  } else {
  	data = {property_id: null}
  }

  ReactDOM.render(
    <New property_id={data.property_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})

