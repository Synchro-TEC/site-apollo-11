import React from 'react';
import {DataTable, DataTableColumn} from 'apollo-11';

const yourData = [
  {task: 'Task 2', priority: 'Critical'},
  {task: 'Task 1', priority: 'Low'},
  {task: 'Task 3', priority: 'Medium'},
  {task: 'Task 5', priority: 'High'},
  {task: 'Task 4', priority: 'Critical'},
];

class DataTableWithSortExample extends React.Component {

  executingSort(sortInfo) {
    //Function to execute when user makes sort in a column
  }

  render() {
    return (
      <div>
        <DataTable rows={yourData} onSort={(sortInfo) => this.executingSort(sortInfo)}>
          <DataTableColumn dataKey='task' sortable>Task</DataTableColumn>
          <DataTableColumn dataKey='priority' sortable>Priority</DataTableColumn>
        </DataTable>
      </div>
    );
  }

}

export default DataTableWithSortExample;
