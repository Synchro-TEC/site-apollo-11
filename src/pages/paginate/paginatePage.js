import React from 'react';
import { Paginate } from 'apollo-11';

class PaginatePage extends React.Component {

  paginateAction(paginateInformation) {
    console.log(paginateInformation);
  }

  render() {
    return (
      <div className='dm-content'>
        paginate documentation area
      </div>
    );
  }

}

export default PaginatePage;
