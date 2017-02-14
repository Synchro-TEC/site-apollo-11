import React from 'react';
import { DataTable, DataTableColumn } from 'apollo-11';
import _cloneDeep from 'lodash/cloneDeep';
import _sortBy from 'lodash/sortBy';

class DataTableWithSortExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataForDataTableExample: [
        {task: 'Task 1', priority: 'Low', startDate: '28/08/2002'},
        {task: 'Task 2', priority: 'Critical', startDate: '13/05/1996'},
        {task: 'Task 3', priority: 'Medium', startDate: '31/01/2010'},
        {task: 'Task 4', priority: 'Critical', startDate: '14/02/2017'},
        {task: 'Task 5', priority: 'High', startDate: '14/01/2016'},
      ],
    }
  }

  //Function to execute when user makes sort in a column
  executingSort(sortInfo) {
    //Cloning the immutable state
    let clone = _cloneDeep(this.state.dataForDataTableExample);
    let sortedData;

    if(sortInfo.direction === 'asc') {
      sortedData = _sortBy(clone, (obj) => {
        if(sortInfo.columnKey === 'startDate') {
          let dateToConvert = obj[sortInfo.columnKey];
          //RegEx convert dd/mm/yyyy to short date format: mm/dd/yyyy
          let convertedDate = dateToConvert.replace(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/, '$2/$1/$3');
          return new Date(convertedDate);
        } else {
          return obj[sortInfo.columnKey];
        }
      });
    } else {
      sortedData = clone.reverse();
    }

    this.setState({dataForDataTableExample: sortedData});
  }

  render() {
    return (
      <div>
        <DataTable data={this.state.dataForDataTableExample} onSort={(sortInfo) => this.executingSort(sortInfo)}>
          <DataTableColumn dataKey='task' sortable>Task</DataTableColumn>
          <DataTableColumn dataKey='priority' sortable>Priority</DataTableColumn>
          <DataTableColumn dataKey='startDate' sortable>Start Date</DataTableColumn>
        </DataTable>
      </div>
    );
  }

}

export default DataTableWithSortExample;
