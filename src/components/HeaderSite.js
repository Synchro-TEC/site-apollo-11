import React from 'react';
import { NavLink } from 'react-router-dom';

class HeaderSite extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <header className='dm-header'>
        <div className='dm-logo'>
          <NavLink title='Back to home'  to='/'>
            <img height='32px' src='logo-apollo.svg' width='auto' />
          </NavLink>
        </div>

        <div className='sv-text-right dm-menu'>
          <span className='sv-horizontal-marged-5'>
           <NavLink activeClassName='active' to='/docs'>Docs</NavLink>
          </span>
          <span className='sv-horizontal-marged-5'>
            <NavLink activeClassName='active' to='/install'>Getting Started</NavLink>
          </span>
        </div>
        <div className='beta'>Beta</div>
      </header>
    );
  }

}

HeaderSite.displayName = 'HeaderSite';

export default HeaderSite;
