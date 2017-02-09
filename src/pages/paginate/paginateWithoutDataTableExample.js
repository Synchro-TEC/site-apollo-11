import React from 'react';

const dataExample = [
  {task: 'Task 1', priority: 'Critical'},
  {task: 'Task 2', priority: 'Low'},
  {task: 'Task 3',  priority: 'Medium'},
  {task: 'Task 4', priority: 'High'},
  {task: 'Task 5',  priority: 'Critical'},
];

class PaginateWithoutDataTableExample extends React.Component {

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

    let itemsOfPaginate = dataExample.map((task, i) => {
      return (
        <li key={i}> {task.task} </li>
      );
    });

    return (
      <div>
        <ul>
          {itemsOfPaginate}
        </ul>
        <Paginate
          totalSizeOfData={dataExample.length}
          recordsForPage={5}
          onNextPage={(paginateInfo) => this.executingOnNextPage(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.executingOnPreviousPage(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.executingOnSelectASpecificPage(paginateInfo)}
        />
      </div>
    );
  }

}

export default PaginateWithoutDataTableExample;
