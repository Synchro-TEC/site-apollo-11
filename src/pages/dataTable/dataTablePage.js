import React from 'react';
import { DataTable, DataTableColumn, Paginate } from 'apollo-11';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';

const exampleData = [
  {name: 'Marcus David', age: 45},
  {name: 'Gordon Byron', age: 64},
  {name: 'Johnny Page',  age: 27},
]

class DataTablePage extends React.Component {

  render() {
    return (
      <div className='dm-content'>
        <div className='sv-row'>
          <div className='sv-column'>
            <h3>Data Table</h3>
            <h6 className='sv-vertical-marged'>
              Data Table is a component that build a table based in user configuration and have an option
              to make a column sortable.
            </h6>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Simple data table column
            </h5>
            <p>
              The component waits an array of objects, but will be visible just the attributes that was configured in
              a DataTableColumn component. For example, you have an object with the fields "name" and "age" and wants this
              values in your DataTable, so will need to configure two columns with this values. The child of DataTableColumn
              is the header cell.
            </p>
          </div>
        </div>
        <DataTable rows={exampleData}>
          <DataTableColumn dataKey='name'>Name</DataTableColumn>
          <DataTableColumn dataKey='age'>Age</DataTableColumn>
        </DataTable>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./configurationWithoutSortExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Sortable data table column
            </h5>
            <p>
              If you want a column with sort option, just add a property to your DataTableColumn named <b>sortable</b>.
              The DataTable now have a property named "onSort", this property is a callback where
              you can get an object with the value of <b>columnKey</b> and the <b> direction</b> of the sort.
            </p>
          </div>
        </div>
        <DataTable rows={exampleData}>
          <DataTableColumn dataKey='name' sortable>Name</DataTableColumn>
          <DataTableColumn dataKey='age' sortable>Age</DataTableColumn>
        </DataTable>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./dataTableWithSortExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTablePage;
