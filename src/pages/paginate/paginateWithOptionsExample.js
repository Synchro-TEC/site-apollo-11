import React from 'react';
import {Paginate} from 'apollo-11';

class PaginateWithOptionsExample extends React.Component {

  executingOnNextPage(paginateInfo) {
    //Function to execute when user go to next page
  }

  executingOnPreviousPage(paginateInfo) {
    //Function to execute when user go to previous page
  }

  executingOnSelectASpecificPage(paginateInfo) {
    //Function to execute when user select a specific page
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
