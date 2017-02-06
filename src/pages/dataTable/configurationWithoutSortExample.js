import React from 'react';
import {DataTable, DataTableColumn} from 'apollo-11';

const yourData = [
  {name: 'Marcus David', age: 45, city: 'Detroit'},
  {name: 'Gordon Byron', age: 64, city: 'Cairo'},
  {name: 'Johnny Page',  age: 27, city: 'Washington'},
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
