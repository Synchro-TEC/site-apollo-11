import React from 'react';
import { Filter } from 'apollo-11';

class SimpleFilterExample extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Filter name='simpleSearch'/>
      </div>
    );
  }
}

SimpleFilterExample.displayName = 'SimpleFilterExample';
export default SimpleFilterExample;