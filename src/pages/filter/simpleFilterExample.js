import React from 'react';
import { Filter } from 'apollo-11';

class SimpleFilterExample extends React.Component {

  doingTheFiltering(value) {
    // Do something with the value of filter
  }

  render() {
    return (
      <div>
        <Filter name='simpleSearch' onFilter={(value) => this.doingTheFiltering(value)}/>
      </div>
    );
  }
}

SimpleFilterExample.displayName = 'SimpleFilterExample';
export default SimpleFilterExample;
