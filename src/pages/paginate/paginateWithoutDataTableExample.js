import React from 'react';
import {Paginate} from 'apollo-11';

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
    // The initial slice mencioned before (same value of recordsByPage)
    this.state = {dataFilteredByPaginate: this.dataForPaginateExample.slice(0,5)}
  }

  doPaginate(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    let filteredData = this.dataForPaginateExample.slice(startOfSlice, endOfSlice);
    return filteredData;
  }

  //Function to execute when user go to next page
  executingOnNextPage(paginateInfo) {
    this.setState({dataFilteredByPaginate: this.doPaginate(paginateInfo)});
  }

  //Function to execute when user go to previous page
  executingOnPreviousPage(paginateInfo) {
    this.setState({dataFilteredByPaginate: this.doPaginate(paginateInfo)});
  }

  //Function to execute when user select a specific page
  executingOnSelectASpecificPage(paginateInfo) {
    this.setState({dataFilteredByPaginate: this.doPaginate(paginateInfo)});
  }

  render() {

    let itemsOfPaginate = this.state.dataFilteredByPaginate.map((task, i) => {
      return <li key={i}> {task.task} - {task.priority} </li>;
    });

    return (
      <div>
        <ul>
          {itemsOfPaginate}
        </ul>
        <Paginate
          onNextPage={(paginateInfo) => this.executingOnNextPage(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.executingOnPreviousPage(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.executingOnSelectASpecificPage(paginateInfo)}
          recordsByPage={5}
          totalSizeOfData={this.dataForPaginateExample.length}
        />
      </div>
    );
  }

}

export default PaginateWithoutDataTableExample;
