import React from 'react';
import {Paginate} from 'apollo-11';

class PaginateWithOptionsExample extends React.Component {

  executingOnNextPage(paginateInfo) {
    // Here you can get the paginate information when onNextPage was triggered
  }

  executingOnPreviousPage(paginateInfo) {
    // Here you can get de paginate information when onPreviousPage was triggered
  }

  executingOnSelectASpecificPage(paginateInfo) {
    // Here you can get de paginate information when onSelectASpecifPage was triggered
  }

  render() {
    return (
      <div>
        <Paginate
          onNextPage={(paginateInfo) => this.executingOnNextPage(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.executingOnPreviousPage(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.executingOnSelectASpecificPage(paginateInfo)}
        />
      </div>
    );
  }

}

export default PaginateWithOptionsExample;
