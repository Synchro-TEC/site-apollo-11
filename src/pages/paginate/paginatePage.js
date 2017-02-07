import React from 'react';
import { Paginate, DataTable, DataTableColumn } from 'apollo-11';
import { generateData } from './generateData';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';

class PaginatePage extends React.Component {

  render() {
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
      </div>
    );
  }

}

export default PaginatePage;
