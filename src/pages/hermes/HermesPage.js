import React from 'react';
import { Hermes } from 'apollo-11';
import {PrismCode} from 'react-prism';

var addMessage = () => {
  Hermes.addMessage(`Message ${Date.now()}`, true);
};

var changeTitle = () => {
  Hermes.setTitle(`New Title ${Date.now()}`);
};

var setContext = (context) => {
  Hermes.setContext(context);
};

const HermesPage = (props) => {

  return (
    <div className='dm-content'>
      <Hermes />
      <div className='sv-row'>
        <div className='sv-column'>
          <h3>Hermes</h3>
          <h6 className='sv-vertical-marged'>
            Hermes is a component for notifications, with themes (contexts) and a complete API to handler messages
          </h6>
          <p>
            <button className='sv-button small default marged' onClick={() => addMessage()}>Add Message</button>
            <button className='sv-button small default marged' onClick={() => changeTitle()}>Add/Change Title</button><br /><br />
            <button className='sv-button small default marged' onClick={() => Hermes.setPosition('top')}>Top</button>
            <button className='sv-button small default marged' onClick={() => Hermes.setPosition('bottom')}>Bottom</button><br /><br />
            <button className='sv-button small default marged' onClick={() => setContext('success')}>Context Success</button>
            <button className='sv-button small default marged' onClick={() => setContext('info')}>Context Info</button>
            <button className='sv-button small default marged' onClick={() => setContext('warning')}>Context Warning</button>
            <button className='sv-button small default marged' onClick={() => setContext('error')}>Context Error</button>
          </p>
        </div>
      </div>

      <div className='dm-code-container'>
        <pre className='line-numbers' data-start='1'>
          <PrismCode className='language-js'>
            {require('!raw-loader!./hermesExamples.js')}
          </PrismCode>
        </pre>
      </div>


    </div>
  )
};

HermesPage.displayName = 'HermesPage';

export default HermesPage;
