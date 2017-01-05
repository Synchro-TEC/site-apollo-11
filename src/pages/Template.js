import React from 'react';
import HeaderSite from '../components/HeaderSite';

function Template(props) {
  return (
    <div>
      <HeaderSite />
      {props.children}
    </div>
  );
}
export default Template;
