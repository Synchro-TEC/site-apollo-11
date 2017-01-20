import React from 'react';
import { Filter } from 'apollo-11';

class SimpleFilterExample extends React.Component {

  search(value) {
    // Do something with the value of filter
  }

  render() {
    return (
      <div>
        <Filter name='simpleSearch' onSearch={(value) => this.search(value)}/>
      </div>
    );
  }
}

SimpleFilterExample.displayName = 'SimpleFilterExample';
export default SimpleFilterExample;