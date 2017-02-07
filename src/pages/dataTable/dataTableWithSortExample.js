import React from 'react';
import {DataTable, DataTableColumn} from 'apollo-11';

const yourData = [
  {name: 'Marcus David', age: 45, city: 'Detroit'},
  {name: 'Gordon Byron', age: 64, city: 'Cairo'},
  {name: 'Johnny Page',  age: 27, city: 'Washington'},
]

class DataTableWithSortExample extends React.Component {

  executingSort(sortInfo) {
    //Function to execute when user makes sort in a column
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
