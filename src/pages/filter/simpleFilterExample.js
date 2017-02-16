import React from 'react';
import { Filter } from 'apollo-11';

class SimpleFilterExample extends React.Component {

  searchByEnter(value) {
    // Do something with the value of filter
  }

  render() {
    return (
      <div>
        <Filter name='simpleSearch' onSearchByEnter={(value) => this.searchByEnter(value)}/>
      </div>
    );
  }
}

SimpleFilterExample.displayName = 'SimpleFilterExample';
export default SimpleFilterExample;
