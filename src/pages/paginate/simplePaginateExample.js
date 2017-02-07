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
          recordsForPage={15}
          totalSizeOfData={yourData.length}
          onNextPage={(paginateInfo) => this.executingOnNextPage(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.executingOnPreviousPage(paginateInfo)}
        />
      </div>
    );
  }

}

export default SimplePaginateExample;
