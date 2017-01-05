import React from 'react';
import { Link } from 'react-router';

class HeaderSite extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <header className='dm-header'>
        <div className='dm-logo'>
          <Link title='Back to home'  to='/'>
            <img height='32px' src='logo-apollo.svg' width='auto' />
          </Link>
        </div>

        <div className='sv-text-right dm-menu'>
          <span className='sv-horizontal-marged-5'>
           <Link activeClassName='active' to='docs'>Docs</Link>
          </span>
          <span className='sv-horizontal-marged-5'>
            <Link activeClassName='active' to='install'>Getting Started</Link>
          </span>
        </div>
        <div className='beta'>Beta</div>
      </header>
    );
  }

}

HeaderSite.displayName = 'HeaderSite';

export default HeaderSite;
