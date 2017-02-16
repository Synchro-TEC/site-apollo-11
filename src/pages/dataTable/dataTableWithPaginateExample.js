import React from 'react';
import {DataTable, DataTableColumn, Paginate} from 'apollo-11';

class DataTableWithPaginateExample extends React.Component {

  constructor(props) {
    super(props);
    this.dataForDataTableExample = [
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
      //And more...
    ];
    // This initial slice is mencioned in Paginate
    this.state = {dataFilteredByPaginate: this.dataForDataTableExample.slice(0,5)};
  }

  doPaginate(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    let filteredData = this.dataForDataTableExample.slice(startOfSlice, endOfSlice);
    return filteredData;
  }

  //Function to execute when user go to next page
  executingOnNextPage(paginateInfo) {
    this.setState({paginateData: this.doPaginate(paginateInfo)});
  }

  //Function to execute when user go to previous page
  executingOnPreviousPage(paginateInfo) {
    this.setState({paginateData: this.doPaginate(paginateInfo)});
  }

  //Function to execute when user select a specific page
  executingOnSelectASpecificPage(paginateInfo) {
    this.setState({paginateData: this.doPaginate(paginateInfo)});
  }

  render() {
    return (
      <div>
        <DataTable data={this.state.dataFilteredByPaginate}>
          <DataTableColumn dataKey='task'>Task</DataTableColumn>
          <DataTableColumn dataKey='priority'>Priority</DataTableColumn>
        </DataTable>
        <Paginate
          onNextPage={(paginateInfo) => this.executingOnNextPage(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.executingOnPreviousPage(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.executingOnSelectASpecificPage(paginateInfo)}
          recordsByPage={5}
          totalSizeOfData={this.dataForDataTableExample.length}
        />
      </div>
    );
  }

}

export default DataTableWithPaginateExample;
