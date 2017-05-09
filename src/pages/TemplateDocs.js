import React from 'react';
import HeaderSite from '../components/HeaderSite';
import { NavLink } from 'react-router-dom';

function TemplateDocs(props) {
  return (
    <div>
      <HeaderSite />
      <aside className='dm-sidebar'>
        <ul>
          <li><NavLink activeClassName='active' to='hermes'>Hermes</NavLink></li>
          <li><NavLink activeClassName='active' to='filter'>Filter</NavLink></li>
          <li><NavLink activeClassName='active' to='data-table'>Data Table</NavLink></li>
          <li><NavLink activeClassName='active' to='paginate'>Paginate</NavLink></li>
          <li><NavLink activeClassName='active' to='power-table'>Power Table</NavLink></li>
          {/* <li><NavLink activeClassName='active' to='docs/user-tests'>User tests</NavLink></li> */}
        </ul>
        <div className='dm-syntec'>
          <a href='https://github.com/Synchro-TEC' rel='noopen' target='_blank'>
            <img height='auto' src='logo-synchro.png' width='100'/>
          </a>
          <br />
          <a href='https://github.com/Synchro-TEC' rel='noopen' target='_blank'>
            <img height='40' src='syntec.svg' width='auto'/>
          </a>
        </div>
      </aside>
      <section className='dm-main'>
        {props.children}
      </section>
    </div>
  );
}
export default TemplateDocs;
