import React from 'react';
import {DataTable, DataTableColumn} from 'apollo-11';

const exampleData = [
  {name: 'Marcus David', age: 45},
  {name: 'Gordon Byron', age: 64},
  {name: 'Johnny Page',  age: 27},
]

class DataTableWithSortExample extends React.Component {

  executingSort(sortInfo) {
    // Do your sort here
  }

  render() {
    return (
      <div>
        <DataTable rows={yourData} onSort={(sortInfo) => this.executingSort(sortInfo)}>
          <DataTableColumn dataKey='name' sortable>Name</DataTableColumn>
          <DataTableColumn dataKey='age' sortable>Age</DataTableColumn>
        </DataTable>
      </div>
    );
  }

}

export default DataTableWithSortExample;
