import React from 'react';
import {Paginate} from 'apollo-11';

class SimplePaginateExample extends React.Component {

  executingOnNextPage(paginateInfo) {
    // Here you can get the paginate information when onNextPage was triggered
  }

  executingOnPreviousPage(paginateInfo) {
    // Here you can get de paginate information when onPreviousPage was triggered
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
