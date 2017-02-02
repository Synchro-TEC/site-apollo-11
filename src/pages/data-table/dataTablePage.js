import React from 'react';
import { DataTable, DataTableColumn } from 'apollo-11';
import { generateData } from './fakeDataToDataTable';

class DataTablePage extends React.Component {
  render() {
    return (
      <div className='dm-content'>
        <DataTable rows={generateData()}>
          <DataTableColumn dataKey='id' sortable>Id</DataTableColumn>
          <DataTableColumn dataKey='task' sortable>Task</DataTableColumn>
          <DataTableColumn dataKey='complete'>Complete</DataTableColumn>
          <DataTableColumn dataKey='priority'>Priority</DataTableColumn>
        </DataTable>
      </div>
    );
  }
}

export default DataTablePage;
