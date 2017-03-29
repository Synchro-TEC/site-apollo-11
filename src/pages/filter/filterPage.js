/**
 * Created by gnf on 11/01/17.
 */
import React from 'react';
import { Filter, DataTable, DataTableColumn, Paginate } from 'apollo-11';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';

class FilterPage extends React.Component {

  constructor() {
    super();
    this.immutableData = [];
    this.state = {
      dataForFilterWithoutOptions: [],
      dataForFilterWithOptions: [],
      sizeOfData: 0,
    };
  }

  componentDidMount() {
    this.getData('http://localhost:3000/tasks', {});
  }

  getData(url, params) {
    axios.get(url, params).then((response) => {
      this.immutableData = response.data;
      this.setState({
        dataForFilterWithoutOptions: response.data.slice(0,10),
        sizeOfData: response.data.length,
        dataForFilterWithOptions: response.data.slice(0,10),
      });
    });
  }

  simpleFilter(value) {
    let result = axios.get('http://localhost:3000/tasks', {
      params: { name_like: value },
    }).then((response) => {
      this.setState({
        dataForFilterWithoutOptions: response.data.slice(0,10),
        sizeOfData: response.data.length,
      });
    });
  }

  convertToUADateToCompare(dateToConvert) {
    if(dateToConvert) {
      const regExp = new RegExp('([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})');
      return new Date(dateToConvert.replace(regExp, '$2/$1/$3'));
    }
  }

  advancedFilter(values) {
    this.refs.paginateForAdvancedFilter.reset();
    let wordlyGoods = values.wordlyGoods;
    let hadABike,
        hadACar,
        hadAMac,
        hadAHelicopter,
        firstDateNumber,
        weddingDayNumber,
        wordlyGoodsString;

    if(this.convertToUADateToCompare(values.firstDate) &&
       this.convertToUADateToCompare(values.weddingDay)) {
      firstDateNumber = this.convertToUADateToCompare(values.firstDate).getTime();
      weddingDayNumber = this.convertToUADateToCompare(values.weddingDay).getTime();
    }

    if(wordlyGoods) {
      for(let i = 0; i<wordlyGoods.length; i++) {
        switch (wordlyGoods[i]) {
          case 'Bike': hadABike = true;
            break;

          case 'Car': hadACar = true;
            break;

          case 'Helicopter': hadAHelicopter = true;
            break;

          case 'Mac': hadAMac = true;
            break;
        }
      }
    }

    if(!_isEmpty(values)) {
      axios.get('http://localhost:3000/tasks', {
        params: {
          name_like: values.valueOfSearch,
          gender: values.gender,
          from: values.from,
          firstDateNumber_gte: firstDateNumber,
          weddingDayNumber_lte: weddingDayNumber,
          wordlyGoods: wordlyGoodsString,
          hadAHelicopter: hadAHelicopter,
          hadABike: hadABike,
          hadACar: hadACar,
          hadAMac: hadAMac,
          _sort: 'firstDateNumber',
        },
      }).then((response) => {
        this.immutableData = response.data;
        this.setState({
          dataForFilterWithOptions: response.data.slice(0,10),
          sizeOfData: response.data.length,
        });
      });
    } else {
      axios.get('http://localhost:3000/tasks').then((response) => {
        this.setState({
          dataForFilterWithOptions: response.data.slice(0,10),
          sizeOfData: response.data.length,
        });
      });
    }
  }

  paginateActionForFilterWithoutOptions(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    this.setState({
      dataForFilterWithoutOptions: this.immutableData.slice(startOfSlice, endOfSlice),
    });
  }

  paginateActionForFilterWithOptions(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    this.setState({
      dataForFilterWithOptions: this.immutableData.slice(startOfSlice, endOfSlice),
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
                    placeholder='Search for name...'>
              <label>
                <span> From: </span>
                <div className='sv-select'>
                  <select name='from' style={{'width': '100%'}}>
                    <option value=''/>
                    <option value='Italy'>Italy</option>
                    <option value='United States'>United States</option>
                    <option value='Australia'>Australia</option>
                    <option value='Russia'>Russia</option>
                    <option value='Polony'>Polony</option>
                    <option value='Netherlands'>Netherlands</option>
                  </select>
                  <label>
                    <i className='fa fa-angle-down fa-fw'/>
                  </label>
                </div>
              </label>
              <label>
                <span> Date between: </span>
                <div className='sv-row--with-gutter'>
                  <div className='sv-column'>
                    <label>
                      <div className='sv-select'>
                        <input name='firstDate' placeholder='dd/mm/yyyy' style={{'width': '100%'}} type='text' />
                        <label> <i className='fa fa-calendar'/> </label>
                      </div>
                    </label>
                  </div>
                  <div className='sv-column'>
                    <label>
                      <div className='sv-select'>
                        <input name='weddingDay' placeholder='dd/mm/yyyy' style={{'width': '100%'}} type='text' />
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
              <label>
                <span>Wordly goods</span>
              </label>
              <label>
                <input name='wordlyGoods' type='checkbox' value='Bike' /> Bike
              </label>
              <label>
                <input name='wordlyGoods' type='checkbox' value='Car' /> Car
              </label>
              <label>
                <input name='wordlyGoods' type='checkbox' value='Helicopter' /> Helicopter
              </label>
              <label>
                <input name='wordlyGoods' type='checkbox' value='Mac' /> Mac
              </label>
            </Filter>
          </div>
        </div>
        <div>
          <DataTable data={this.state.dataForFilterWithOptions}>
            <DataTableColumn dataKey='name'>Name</DataTableColumn>
            <DataTableColumn dataKey='from'>From</DataTableColumn>
            <DataTableColumn dataKey='gender'>Gender</DataTableColumn>
            <DataTableColumn dataKey='firstDate'>First Date</DataTableColumn>
            <DataTableColumn dataKey='weddingDay'>Wedding day</DataTableColumn>
            <DataTableColumn dataKey='wordlyGoods'>Wordly Goods</DataTableColumn>
          </DataTable>
        </div>
        <Paginate
          onNextPage={(paginateInfo) => this.paginateActionForFilterWithOptions(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginateActionForFilterWithOptions(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.paginateActionForFilterWithOptions(paginateInfo)}
          ref='paginateForAdvancedFilter'
          totalSizeOfData={this.state.sizeOfData}
        />
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
        <DataTable data={this.state.dataForFilterWithoutOptions}>
          <DataTableColumn dataKey='name'>Name</DataTableColumn>
          <DataTableColumn dataKey='from'>From</DataTableColumn>
          <DataTableColumn dataKey='gender'>Gender</DataTableColumn>
          <DataTableColumn dataKey='firstDate'>First Date</DataTableColumn>
          <DataTableColumn dataKey='weddingDay'>Wedding Day</DataTableColumn>
          <DataTableColumn dataKey='wordlyGoods'>Wordly Goods</DataTableColumn>
        </DataTable>
        <Paginate
          onNextPage={(paginateInfo) => this.paginateActionForFilterWithoutOptions(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginateActionForFilterWithoutOptions(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.paginateActionForFilterWithoutOptions(paginateInfo)}
          totalSizeOfData={this.state.sizeOfData}
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
