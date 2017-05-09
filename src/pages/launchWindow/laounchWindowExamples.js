import React from 'react';
import { LaunchWindow } from 'syntec-apollo-11';

class LaunchWindowExample extends React.Component {
  constructor(){
    super();
  }

  showLaunchWindow(){
    this.refs.modal.show();
  }

  render() {
    return(
      <div>
        <LaunchWindow ref='modal'>
          Modal
        </LaunchWindow>
        <p>
          <button className='sv-button small default' onClick={() => this.showLaunchWindow()}>Open</button>
        </p>
      </div>
    )
  }
}

LaunchWindowExample.displayName = 'LaunchWindowExample';

export default LaunchWindowExample;
