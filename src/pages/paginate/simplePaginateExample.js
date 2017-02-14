import React from 'react';
import {Paginate} from 'apollo-11';

class SimplePaginateExample extends React.Component {

  executingOnNextPage(paginateInfo) {
    //Function to execute when user go to next page
  }

  executingOnPreviousPage(paginateInfo) {
    //Function to execute when user go to previous page
  }

  render() {
    return (
      <div>
        <Paginate
          onNextPage={(paginateInfo) => this.executingOnNextPage(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.executingOnPreviousPage(paginateInfo)}
          recordsByPage={5}
          totalSizeOfData={yourData.length}
        />
      </div>
    );
  }

}

export default SimplePaginateExample;
