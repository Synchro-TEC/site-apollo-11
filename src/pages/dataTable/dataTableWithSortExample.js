import React from 'react';
import {DataTable, DataTableColumn} from 'apollo-11';

const yourData = [
    {name: 'Marcus David', age: 45},
    {name: 'Gordon Byron', age: 64},
]

class DataTableWithSortExample extends React.Component {

  executingSort(columnKey, directionOfSort) {
    // Do your sort here
  }

  render() {
    return (
      <div>
        <DataTable rows={yourData} onSort={(columnKey, directionOfSort) => this.executingSort(columnKey, directionOfSort)}>
          <DataTableColumn dataKey='name' sortable>Name</DataTableColumn>
          <DataTableColumn dataKey='age' sortable>Age</DataTableColumn>
        </DataTable>
      </div>
    );
  }

}

export default DataTableWithSortExample;
