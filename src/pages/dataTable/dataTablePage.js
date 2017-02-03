import React from 'react';
import { DataTable, DataTableColumn, Paginate } from 'apollo-11';
import { generateData } from './fakeDataToDataTable';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';

const exampleData = [
    {name: 'Marcus David', age: 45},
    {name: 'Gordon Byron', age: 64},
]

class DataTablePage extends React.Component {

  onSort(columnKey, direction) { }

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
        <DataTable rows={generateData()} onSort={(columnKey, direction) => this.onSort(columnKey, direction)}>
          <DataTableColumn dataKey='id' sortable>Id</DataTableColumn>
          <DataTableColumn dataKey='task' sortable>Task</DataTableColumn>
          <DataTableColumn dataKey='complete'>Complete</DataTableColumn>
          <DataTableColumn dataKey='priority'>Priority</DataTableColumn>
          <DataTableColumn dataKey='issueType'>Issue Type</DataTableColumn>
          <DataTableColumn dataKey='startDate'>Start Date</DataTableColumn>
          <DataTableColumn dataKey='completeDate'>Complete Date</DataTableColumn>
        </DataTable>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Simple data table column
            </h5>
            <p>
              The component waits an array of objects, but will be visible just the attributes that was configured in
              a DataTableColumn component. For example, you have an object with the fields "name" and "age" and wants this
              values in your DataTable, so will need to configure two columns with this values, and the build will be:
            </p>
            <p>
              O componente espera uma lista de objetos, mas serão exibidos apenas os atributos para os quais
              exista um DataTableColumn configurado. Por exemplo, se você possui um objeto com um campo 'nome', e 'age'
              e quer que esse campos apareçam no DataTable, terá de configurar duas colunas com estes valores, da
              seguinte forma:
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <div className='dm-code-container'>
              <pre>
                <PrismCode className='language-js'>
                  {require('!raw-loader!./configurationWithoutSortExample.js')}
                </PrismCode>
              </pre>
            </div>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <p>
              This configuration will build:
            </p>
          </div>
        </div>
        <DataTable rows={exampleData}>
          <DataTableColumn dataKey='name'>Name</DataTableColumn>
          <DataTableColumn dataKey='age'>Age</DataTableColumn>
        </DataTable>
        <div className='sv-row'>
          <div className='sv-column'>
            <p>
              Remember, the child of component DataTableColumn is the title of correspondent column.
              Lembre-se, o filho do componente DataTableColumn corresponde ao titulo da respectiva coluna na tabela.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Sortable data table column
            </h5>
            <p>
              If you want a column with sort option, just add a property to your DataTableColumn named <b>sortable</b>.
            </p>
            <p>
              Se você deseja uma coluna com opção de ordenação, apenas adicione uma propriedade chamada
              <b> sortable </b> no seu DataTableColumn.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <div className='dm-code-container'>
              <pre>
                <PrismCode className='language-js'>
                  {require('!raw-loader!./dataTableWithSortExample.js')}
                </PrismCode>
              </pre>
            </div>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <p>
              Now, the DataTable have a property named 'onSort'. This property is a callback where
              you can get the <b>columnKey</b> and the <b> direction</b> of the sort. The result will be:
            </p>
          </div>
        </div>
        <DataTable rows={exampleData}>
          <DataTableColumn dataKey='name' sortable>Name</DataTableColumn>
          <DataTableColumn dataKey='age' sortable>Age</DataTableColumn>
        </DataTable>
      </div>
    );
  }
}

export default DataTablePage;
