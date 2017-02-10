import React from 'react';

class PaginateWithoutDataTableExample extends React.Component {

  constructor() {
    super();
    this.dataForPaginateExample = [
      {task: 'Task 1', priority: 'Critical'},
      {task: 'Task 2', priority: 'Critical'},
      {task: 'Task 3', priority: 'Low'},
      {task: 'Task 4', priority: 'High'},
      {task: 'Task 5', priority: 'Medium'},
      {task: 'Task 6', priority: 'High'},
      {task: 'Task 7', priority: 'Critical'},
      {task: 'Task 8', priority: 'Low'},
      {task: 'Task 9', priority: 'Medium'},
      {task: 'Task 10', priority: 'Critical'},
      {task: 'Task 11', priority: 'High'},
      {task: 'Task 12', priority: 'Critical'},
      {task: 'Task 13', priority: 'Medium'},
      {task: 'Task 14', priority: 'Critical'},
      {task: 'Task 15', priority: 'Low'},
      {task: 'Task 16', priority: 'Medium'},
      {task: 'Task 17', priority: 'High'},
      {task: 'Task 18', priority: 'Medium'},
      {task: 'Task 19', priority: 'Low'},
      {task: 'Task 20', priority: 'Critical'},
    ];
    // The initial slice mencioned before (same value of recordsForPage)
    this.state = {paginateData: this.dataForPaginateExample.slice(0,5)}
  }

  doPaginateFilter(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    let filteredData = this.dataForPaginateExample.slice(startOfSlice, endOfSlice);
    return filteredData;
  }

  //Function to execute when user go to next page
  executingOnNextPage(paginateInfo) {
    this.setState({paginateData: this.doPaginateFilter(paginateInfo)});
  }

  //Function to execute when user go to previous page
  executingOnPreviousPage(paginateInfo) {
    this.setState({paginateData: this.doPaginateFilter(paginateInfo)});
  }

  //Function to execute when user select a specific page
  executingOnSelectASpecificPage(paginateInfo) {
    this.setState({paginateData: this.doPaginateFilter(paginateInfo)});
  }

  render() {

    let itemsOfPaginate = this.state.paginateData.map((task, i) => {
      return <li key={i}> {task.task} - {task.priority} </li>;
    });

    return (
      <div>
        <ul>
          {itemsOfPaginate}
        </ul>
        <Paginate
          totalSizeOfData={this.dataForPaginateExample.length}
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
