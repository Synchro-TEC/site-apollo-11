import React from 'react';
import {PowerTable} from 'apollo-11';

class PowerTablePage extends React.Component {


  render() {
    return (
      <div>
        <PowerTable dataUrl='http://localhost:3000/users' />
      </div>
    );
  }

}

export default PowerTablePage;