import React from 'react';
import { Paginate, DataTable, DataTableColumn } from 'apollo-11';
import { generateData } from '../../utils/generateData';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';

class PaginatePage extends React.Component {

  constructor(props) {
    super(props);
    this.initialDataForPaginateExample = generateData();
    this.state = { paginateData: this.initialDataForPaginateExample}
  }

  componentDidMount() {
    let oldData = this.state.paginateData;
    this.setState({paginateData: oldData.slice(0,5)});
  }

  doPaginateFilter(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    let filteredData = this.initialDataForPaginateExample.slice(startOfSlice, endOfSlice);
    return filteredData;
  }

  paginateAction(paginateInfo) {
    this.setState({paginateData: this.doPaginateFilter(paginateInfo)});
  }

  render() {

    let itemsOfPaginate = this.state.paginateData.map((task, i) => {
      return (
        <li key={i} style={{'marginBottom': '4px'}}> {task.task} </li>
      );
    });

    return (
      <div className='dm-content'>
        <div className='sv-row'>
          <div className='sv-column'>
            <h3> Paginate </h3>
            <h6 className='sv-vertical-marged'>
              You can choose a simple or a paginate with options, in both choices you
              can configure how much records for page you wants. By default,
              the number of records for page is ten.
            </h6>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Simple paginate
            </h5>
            <p>
              A simple paginate have two properties to receive callbacks,
              <b> onNextPage </b> and <b> onPreviousPage </b>
              where you can get the value of currentPage, limit and offset when
              these actions are triggered.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Paginate />
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./simplePaginateExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Paginate with options
            </h5>
            <p>
              If you want options to select a specif page, you have to add
              a property to your component named <b>onSelectASpecifPage</b>. This property
              will receive your callback function, and return the same information of
              onNext and onPrevious explained before.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Paginate
              totalSizeOfData={generateData().length}
              onSelectASpecifPage={() => {}}
            />
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./paginateWithOptionsExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Paginate is flexible
            </h5>
            <p>
              You don't have to use the Paginate aways together with DataTable. Below,
              the component was used in a single list.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <div className='sv-text-center'>
              <ul>
                {itemsOfPaginate}
              </ul>
            </div>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Paginate
              totalSizeOfData={this.initialDataForPaginateExample.length}
              recordsForPage={5}
              onNextPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              onPreviousPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              onSelectASpecifPage={(paginateInfo) => this.paginateAction(paginateInfo)}
            />
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./paginateWithoutDataTableExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
      </div>
    );
  }

}

export default PaginatePage;
