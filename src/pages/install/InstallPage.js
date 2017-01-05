import React from 'react';
import {PrismCode} from 'react-prism';

const InstallPage = (props) => {

  return(
    <div className='dm-content'>
      <h4 className='sv-title'>Install</h4>
      <p>
        Apollo-11 is in development and not published yet.
      </p>

      <div className='dm-code-container'>
        <pre className='line-numbers' data-start='1'>
          <PrismCode className='language-bash'>
            {require('!raw-loader!./installDemo.sh')}
          </PrismCode>
        </pre>
      </div>

      <p>Remember, you need Saturn-V running in your app for styles.</p>

    </div>
  )
};

InstallPage.displayName = 'InstallPage';

export default InstallPage;
