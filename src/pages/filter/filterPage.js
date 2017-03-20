/**
 * Created by gnf on 11/01/17.
 */
import React from 'react';
import { Filter, DataTable, DataTableColumn, Paginate } from 'apollo-11';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';
import _cloneDeep from 'lodash/cloneDeep';
import axios from 'axios';

class FilterPage extends React.Component {

  constructor() {
    super();
    this.immutableData = [];
    this.state = {data: [], dataForAdvancedFilter: []};
  }

  componentDidMount() {
    this.getData('http://localhost:3000/tasks', {});
  }

  getData(url, params) {
    axios.get(url, params).then((response) => {
      this.immutableData = response.data;
      this.setState({
        data: response.data.slice(0,10),
        dataForAdvancedFilter: response.data,
      });
    });
  }

  simpleFilter(value) {
    let result = axios.get('http://localhost:3000/tasks', {
      params: {
        firstName_like: value,
      },
    })
    .then((response) => {
      this.setState({data: response.data.slice(0,10)});
    });
  }

  convertToUADateToCompare(dateToConvert) {
    if(dateToConvert) {
      const regExp = new RegExp('([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})');
      return new Date(dateToConvert.replace(regExp, '$2/$1/$3'));
    }
  }

  advancedFilter(values) {
    let convertedBornDate = this.convertToUADateToCompare(values.bornDate);
    let convertedDiedDate = this.convertToUADateToCompare(values.diedDate);
    //gte - Greater than or equal to
    //lte - Less than or equal to
    let result = axios.get('http://localhost:3000/tasks', {
      params: {
        firstName_like: values.valueOfSearch,
        email_like: values.email,
        gender: values.gender,
        from: values.from,
        bornYear_gte: parseInt(values.bornDate.slice(6,10)),
        diedYear_lte: parseInt(values.diedDate.slice(6,10)),
      },
    }).then((response) => {
      this.setState({dataForAdvancedFilter: response.data});
    });
  }

  paginateAction(paginateInfo) {
    let data = this.state.data;
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    this.setState({
      data: this.immutableData.slice(startOfSlice, endOfSlice),
    });
  }

  paginateActionForAdvancedFilter(paginateInfo) {
    let data = this.state.data;
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    this.setState({
      dataForAdvancedFilter: this.immutableData.slice(startOfSlice, endOfSlice),
    });
  }

  render() {
    return (
      <div className='dm-content'>
        <div className='sv-row'>
          <div className='sv-column'>
            <h3>Filter</h3>
            <h6 className='sv-vertical-marged'>
              You can choose a simple or a filter options, in both choices you
              can pass a callback to property <b>onClearAll</b> to execute when user clear the fields.
            </h6>
            <p>
              When you have fields that are different of select, radio or checkbox you need to
              pass a callback to the onClearAll property.
            </p>
            <h5 className='bold'>
              Filter with options
            </h5>
            <p>
              In a filter with options, you can build the options the way you want as long this
              types have a name, included the filter component. If you want a set of options for
              a checkbox, just give to options the same name. The name of a field will be your key
              in return.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Filter name='valueOfSearch'
                    onFilter={(values) => this.advancedFilter(values)}
                    placeholder='Search for first name'>
              <label>
                <div className='sv-row--with-gutter'>
                  <div className='sv-column'>
                    <span>From:</span>
                    <select name='from' style={{'width': '100%'}}>
                      <option value=''/>
                      <option value='Italy'>Italy</option>
                      <option value='United States'>United States</option>
                      <option value='Australia'>Australia</option>
                      <option value='Russia'>Russia</option>
                      <option value='Polony'>Polony</option>
                      <option value='Netherlands'>Netherlands</option>
                    </select>
                  </div>
                  <div className='sv-column'>
                    <label>
                      <span> Email: </span>
                      <input name='email' style={{'width': '100%'}} type='text'/>
                    </label>
                  </div>
                </div>
              </label>
              <label>
                <span> Date between: </span>
                <div className='sv-row--with-gutter'>
                  <div className='sv-column'>
                    <label>
                      <div className='sv-select'>
                        <input name='bornDate' placeholder='dd/mm/yyyy' style={{'width': '100%'}} type='text' />
                        <label> <i className='fa fa-calendar'/> </label>
                      </div>
                    </label>
                  </div>
                  <div className='sv-column'>
                    <label>
                      <div className='sv-select'>
                        <input name='diedDate' placeholder='dd/mm/yyyy' style={{'width': '100%'}} type='text' />
                        <label> <i className='fa fa-calendar'/> </label>
                      </div>
                    </label>
                  </div>
                </div>
              </label>
              <label>
                <span>Gender:</span>
              </label>
              <label>
                <input name='gender' type='radio' value='Male' /> Male
              </label>
              <label>
                <input name='gender' type='radio' value='Female' /> Female
              </label>
            </Filter>
          </div>
        </div>
        <div className='sv-vertical-marged-50'>
          <DataTable data={this.state.dataForAdvancedFilter}>
            <DataTableColumn dataKey='firstName'>First Name</DataTableColumn>
            <DataTableColumn dataKey='lastName'>Last Name</DataTableColumn>
            <DataTableColumn dataKey='email'>Email</DataTableColumn>
            <DataTableColumn dataKey='from'>From</DataTableColumn>
            <DataTableColumn dataKey='gender'>Gender</DataTableColumn>
            <DataTableColumn dataKey='bornDate'>Born Date</DataTableColumn>
            <DataTableColumn dataKey='diedDate'>Died Date</DataTableColumn>
          </DataTable>
        </div>
        {/* <Paginate
          onNextPage={(paginateInfo) => this.paginateActionForAdvancedFilter(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginateActionForAdvancedFilter(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.paginateActionForAdvancedFilter(paginateInfo)}
          totalSizeOfData={50}
        /> */}
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./filterWithOptionsExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
        <div className='sv-row sv-no-margins'>
          <div className='sv-column'>
            <p>
              This configuration will return something like that:
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <div className='dm-code-container'>
              <pre>
                <PrismCode className='language-js'>
                  {require('!raw-loader!./filterWithOptionsReturnExample.js')}
                </PrismCode>
              </pre>
            </div>
          </div>
        </div>
        <div className='sv-vertical-marged-50'/>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Filter without options
            </h5>
            <p>
              In a filter without options, you can get back the value of search value. The search works when enter
              is pressed.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Filter name='valueOfSingleSearch'
                    onFilter={(value) => this.simpleFilter(value)}
                    placeholder="I'm just a single filter!" />
          </div>
        </div>
        <div className='sv-vertical-marged-50'>
          <DataTable data={this.state.data}>
            <DataTableColumn dataKey='firstName'>First Name</DataTableColumn>
            <DataTableColumn dataKey='lastName'>Last Name</DataTableColumn>
            <DataTableColumn dataKey='email'>Email</DataTableColumn>
            <DataTableColumn dataKey='from'>From</DataTableColumn>
            <DataTableColumn dataKey='gender'>Gender</DataTableColumn>
            <DataTableColumn dataKey='bornDate'>Born Date</DataTableColumn>
            <DataTableColumn dataKey='diedDate'>Died Date</DataTableColumn>
          </DataTable>
        </div>
        <Paginate
          onNextPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.paginateAction(paginateInfo)}
          totalSizeOfData={50}
        />
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./simpleFilterExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
      </div>
    );
  }
}

FilterPage.displayName = 'FilterPage';

export default FilterPage;
