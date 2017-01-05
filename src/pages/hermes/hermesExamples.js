import React from 'react';
import { Hermes } from 'apollo-11';

var addMessage = () => {
  Hermes.addMessage(`Message ${Date.now()}`, true);
};

var changeTitle = () => {
  Hermes.setTitle(`New Title ${Date.now()}`);
};

var setContext = (context) => {
  Hermes.setContext(context);
};

class HermesExamples extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Hermes />
        <div>
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
    );
  }
}

HermesExamples.displayName = 'HermesExamples';

export default HermesExamples;
