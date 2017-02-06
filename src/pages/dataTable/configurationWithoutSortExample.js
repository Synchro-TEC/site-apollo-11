import React from 'react';
import {DataTable, DataTableColumn} from 'apollo-11';

const exampleData = [
  {name: 'Marcus David', age: 45},
  {name: 'Gordon Byron', age: 64},
  {name: 'Johnny Page',  age: 27},
]

class ConfigurationWithoutSortExample extends React.Component {

  render() {
    return (
      <div>
        <DataTable rows={yourData}>
          <DataTableColumn dataKey='name'>Name</DataTableColumn>
          <DataTableColumn dataKey='age'>Age</DataTableColumn>
        </DataTable>
      </div>
    );
  }

}

export default ConfigurationWithoutSortExample;
