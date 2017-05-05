import React from 'react';
import { LaunchWindow } from 'syntec-apollo-11';
import {PrismCode} from 'react-prism';

class LaunchWindowPage extends React.Component {
  constructor(props){
    super(props);
  }

  showLaunchWindow(){
    this.refs.modal.show();
  }

  render() {
    return(
    <div className='dm-content'>
      <LaunchWindow ref='modal'>
        Modal
      </LaunchWindow>

      <div className='sv-row'>
        <div className='sv-column'>
          <h3>Launch Window</h3>
          <h6 className='sv-vertical-marged'>
            Launch Window is a modal component.
          </h6>
          <p>
            <button className='sv-button small default' onClick={() => this.showLaunchWindow()}>Open</button>
          </p>
        </div>
      </div>

      <div className='dm-code-container'>
        <pre className='line-numbers' data-start='1'>
          <PrismCode className='language-js'>
            {require('!raw-loader!./laounchWindowExamples.js')}
          </PrismCode>
        </pre>
      </div>

    </div>
    )
  }
}

LaunchWindowPage.displayName = 'LaunchWindowPage';

export default LaunchWindowPage;


