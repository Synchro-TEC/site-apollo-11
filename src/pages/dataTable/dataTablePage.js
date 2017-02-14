import React from 'react';
import { DataTable, DataTableColumn, Paginate } from 'apollo-11';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';
import {generateData} from '../../utils/generateData';
import _sortBy from 'lodash/sortBy';
import _cloneDeep from 'lodash/cloneDeep';

class DataTablePage extends React.Component {

  constructor() {
    super();
    this.dataForDataTableWithPaginateExample = generateData();
    this.dataForSimpleDataTableExample = [
      {task: 'Task 1', priority: 'Critical'},
      {task: 'Task 2', priority: 'Low'},
      {task: 'Task 3',  priority: 'Medium'},
      {task: 'Task 4', priority: 'High'},
      {task: 'Task 5',  priority: 'Critical'},
    ];
    this.state = {
      dataForSortableColumnDataTableExample: [
        {task: 'Task 1', priority: 'Low', startDate: '28/08/2002'},
        {task: 'Task 2', priority: 'Critical', startDate: '13/05/1996'},
        {task: 'Task 3',  priority: 'Medium', startDate: '31/01/2010'},
        {task: 'Task 4',  priority: 'Critical', startDate: '14/02/2017'},
        {task: 'Task 5', priority: 'High', startDate: '14/01/2016'},
      ],
      dataFilteredByPaginate: this.dataForDataTableWithPaginateExample.slice(0,5),
    };
  }

  doPaginate(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    let filteredData = this.dataForDataTableWithPaginateExample.slice(startOfSlice, endOfSlice);
    return filteredData;
  }

  paginateAction(paginateInfo) {
    this.setState({dataFilteredByPaginate: this.doPaginate(paginateInfo)});
  }

  executeSort(sortInfo) {
    let clone = _cloneDeep(this.state.dataForSortableColumnDataTableExample);
    let sortedData;

    if(sortInfo.direction === 'asc') {
      sortedData = _sortBy(clone, (obj) => {
        if(sortInfo.columnKey === 'startDate') {
          let dateToConvert = obj[sortInfo.columnKey];
          let convertedDate = dateToConvert.replace(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/, '$3/$2/$1');
          return new Date(convertedDate);
        } else {
          return obj[sortInfo.columnKey];
        }
      });
    } else {
      sortedData = clone.reverse();
    }

    this.setState({dataForSortableColumnDataTableExample: sortedData});
  }

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
        <DataTable data={this.dataForSimpleDataTableExample}>
          <DataTableColumn dataKey='task'>Task</DataTableColumn>
          <DataTableColumn dataKey='priority'>Priority</DataTableColumn>
        </DataTable>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./simpleDataTableExample.js')}
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
        <DataTable data={this.state.dataForSortableColumnDataTableExample} onSort={(sortInfo) => this.executeSort(sortInfo)}>
          <DataTableColumn dataKey='task' sortable>Task</DataTableColumn>
          <DataTableColumn dataKey='priority' sortable>Priority</DataTableColumn>
          <DataTableColumn dataKey='startDate' sortable>Start Date</DataTableColumn>
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
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              DataTable with paginate
            </h5>
            <p>
              You have option to use DataTable with the Paginate component, whether it simple or with options.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <DataTable data={this.state.dataFilteredByPaginate}>
              <DataTableColumn dataKey='task'>Task</DataTableColumn>
              <DataTableColumn dataKey='priority'>Priority</DataTableColumn>
            </DataTable>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Paginate
              onNextPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              onPreviousPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              onSelectASpecifPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              recordsByPage={5}
              totalSizeOfData={this.dataForDataTableWithPaginateExample.length}
            />
          </div>
        </div>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./dataTableWithPaginateExample.js')}
          </PrismCode>
        </ShowCode>
      </div>
    );
  }
}

export default DataTablePage;
