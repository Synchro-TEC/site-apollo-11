import React from 'react';
import {DataTable, DataTableColumn} from 'apollo-11';

const dataForDataTableExample = [
  {task: 'Task 1', priority: 'Critical'},
  {task: 'Task 2', priority: 'Low'},
  {task: 'Task 3', priority: 'Medium'},
  {task: 'Task 4', priority: 'High'},
  {task: 'Task 5', priority: 'Critical'},
];

class ConfigurationWithoutSortExample extends React.Component {

  render() {
    return (
      <div>
        <DataTable data={dataForDataTableExample}>
          <DataTableColumn dataKey='task'>Task</DataTableColumn>
          <DataTableColumn dataKey='priority'>Priority</DataTableColumn>
        </DataTable>
      </div>
    );
  }

}

export default ConfigurationWithoutSortExample;