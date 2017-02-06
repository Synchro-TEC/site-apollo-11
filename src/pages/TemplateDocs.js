import React from 'react';
import HeaderSite from '../components/HeaderSite';
import { Link } from 'react-router';

function TemplateDocs(props) {
  return (
    <div>
      <HeaderSite />

      <aside className='dm-sidebar'>

        <ul>
          <li><Link activeClassName='active' to='docs/hermes'>Hermes</Link></li>
          <li><Link activeClassName='active' to='docs/launch-window'>Launch Window</Link></li>
          <li><Link activeClassName='active' to='docs/colors'>Loader</Link></li>
          <li><Link activeClassName='active' to='docs/filter'>Filter</Link></li>
          <li><Link activeClassName='active' to='docs/data-table'>Data Table</Link></li>
          <li><Link activeClassName='active' to='docs/paginate'>Paginate</Link></li>
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
