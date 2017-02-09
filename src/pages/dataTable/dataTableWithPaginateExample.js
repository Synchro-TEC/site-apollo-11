import React from 'react';
import {DataTable, DataTableColumn, Paginate} from 'apollo-11';
import {generateData} from '../../utils/generateData';

class DataTableWithPaginateExample extends React.Component {

  goToNextPage(paginateInfo) {
    //Function to execute when user go to next page
  }

  goToPreviousPage(paginateInfo) {
    //Function to execute when user go to previous page
  }

  onSelectASpecifPage(paginateInfo) {
    //Function to execute when user go to a specific page
  }

  render() {
    return (
      <div>
        <DataTable rows={generateData()}>
          <DataTableColumn dataKey='task'>Task</DataTableColumn>
          <DataTableColumn dataKey='priority'>Priority</DataTableColumn>
        </DataTable>
        <Paginate
          recordsForPage={5}
          totalSizeOfData={generateData().length}
          onNextPage={(paginateInfo) => this.goToNextPage(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.goToPreviousPage(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.goToPreviousPage(paginateInfo)}
        />
      </div>
    );
  }

}

export default DataTableWithPaginateExample;
