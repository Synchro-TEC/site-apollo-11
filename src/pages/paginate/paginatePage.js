import React from 'react';
import { Paginate, DataTable, DataTableColumn } from 'apollo-11';
import { generateData } from './generateData';

class PaginatePage extends React.Component {

  constructor(props) {
    super(props);
    this.initialData = generateData();
    this.state = { dataWithPaginateFilter: this.initialData}
  }

  paginateAction(paginateInfo) {
    let newData = this.initialData.slice(paginateInfo.offset, paginateInfo.offset+paginateInfo.limit);
    this.setState({ dataWithPaginateFilter: newData});
  }

  componentDidMount() {
    let newData = this.initialData.slice(0, 10)
    this.setState({ dataWithPaginateFilter: newData});
  }

  render() {
    return (
      <div className='dm-content'>
        <div className='sv-row'>
          <div className='sv-column'>
            <h3> Paginate </h3>
            <h6 className='sv-vertical-marged'>
              Paginate is a pagination component that works with callbacks.
            </h6>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Simple paginate
            </h5>
            <p>
              A simple paginate have just two callbacks: <b> onNextPage </b> and <b> onPreviousPage </b>
              where you can get the value
            </p>
          </div>
        </div>
        <DataTable rows={this.state.dataWithPaginateFilter}>
          <DataTableColumn dataKey='id'>Id</DataTableColumn>
          <DataTableColumn dataKey='task'>Task</DataTableColumn>
          <DataTableColumn dataKey='complete'>Complete</DataTableColumn>
        </DataTable>
        <Paginate
          totalSizeOfData={generateData().length}
          onNextPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginateAction(paginateInfo)}
        />
      </div>
    );
  }

}

export default PaginatePage;
