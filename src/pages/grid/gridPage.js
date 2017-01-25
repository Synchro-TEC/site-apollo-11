import React from 'react';
import { Grid } from 'apollo-11';
import { generateFakeData } from './fakeDataToGrid';

class GridPage extends React.Component {

  render() {
    return (
      <div className='dm-content'>
        <Grid data={generateFakeData().rows}
              titles={generateFakeData().titles}/>
      </div>
    );
  }
}

export default GridPage;
