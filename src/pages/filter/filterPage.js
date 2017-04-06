/**
 * Created by gnf on 11/01/17.
 */
import React from 'react';
import { Filter, DataTable, DataTableColumn } from 'apollo-11';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import _assign from 'lodash/assign';

class FilterPage extends React.Component {

  constructor() {
    super();
    this.immutableData = [
      {
        name: 'Lorraine Barros',
        from: 'Russia',
        gender: 'Female',
        weddingDay: '02/03/2017',
        worldlyGoods: 'Bike, Car, Helicopter, Mac',
        hadABike: true,
        hadACar: true,
        hadAHelicopter: true,
        hadAMac: true,
      },
      {
        name: 'Núbia Xavier',
        from: 'United States',
        gender: 'Female',
        weddingDay: '28/02/2010',
        worldlyGoods: 'Helicopter',
        hadAHelicopter: true,
        hadAMac: false,
        hadABike: false,
        hadACar: false,
      },
      {
        name: 'Vitória Braga Filho',
        from: 'Australia',
        gender: 'Female',
        weddingDay: '08/02/2005',
        worldlyGoods: 'Bike',
        hadABike: true,
        hadAMac: false,
        hadACar: false,
        hadAHelicopter: false,
      },
      {
        name: 'Ladislau Braga',
        from: 'Netherlands',
        gender: 'Male',
        weddingDay: '10/01/2000',
        hadABike: true,
        hadAMac: true,
        hadAHelicopter: false,
        hadACar: false,
        worldlyGoods: 'Bike, Mac',
      },
      {
        name: 'Pedro Saraiva',
        from: 'Italy',
        gender: 'Male',
        weddingDay: '07/07/1996',
        worldlyGoods: 'Bike, Car, Helicopter',
        hadABike: true,
        hadACar: true,
        hadAHelicopter: true,
        hadAMac: false,
      },
    ];
    this.state = {
      dataForFilterWithoutOptions: this.immutableData,
      dataFoundByFilterWithOptions: this.immutableData,
    };
  }

  convertToUADateToCompare(dateToConvert) {
    if(dateToConvert) {
      const regExp = new RegExp('([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})');
      return new Date(dateToConvert.replace(regExp, '$2/$1/$3'));
    }
  }

  mountWordlyGoodsObject(filterValues) {
    let worldlyGoodsObject = {
      hadABike: false,
      hadACar: false,
      hadAMac: false,
      hadAHelicopter: false,
    };

    for(let i = 0; i<filterValues.worldlyGoods.length; i++) {
      switch (filterValues.worldlyGoods[i]) {
        case 'Bike':
          worldlyGoodsObject.hadABike = true;
        break;
        case 'Car':
          worldlyGoodsObject.hadACar = true;
        break;
        case 'Mac':
          worldlyGoodsObject.hadAMac = true;
        break;
        case 'Helicopter':
          worldlyGoodsObject.hadAHelicopter = true;
        break;
      }
    }
    return worldlyGoodsObject;
  }

  findDatesLessThan(date) {
    return _filter(this.immutableData, (item) => {
      return date >= this.convertToUADateToCompare(item.weddingDay);
    });
  }

  findDatesGreaterThan(date) {
    return _filter(this.immutableData, (item) => {
      return date <= this.convertToUADateToCompare(item.weddingDay);
    });
  }

  findDatesBetween(dateLTE, dateGTE) {
    return _filter(this.immutableData, (item) => {
      let itemWeddingDay = this.convertToUADateToCompare(item.weddingDay);
      return dateGTE <= itemWeddingDay && dateLTE >= itemWeddingDay;
    });
  }

  prepareFilter(values) {
    let filterValues = {};
    for(let property in values) {
      switch (property) {
        case 'from':
          filterValues.from = values.from;
        break;
        case 'gender':
          filterValues.gender = values.gender;
        break;
        case 'worldlyGoods':
          filterValues = _assign(filterValues, this.mountWordlyGoodsObject(values));
        break;
      }
    }
    return filterValues;
  }

  doAdvancedFilter(values) {
    let { weddingDayGTE, weddingDayLTE } = values;
    let foundData;

    if(!_isEmpty(values)) {
      let filterValues = this.prepareFilter(values);
      if(weddingDayGTE && !weddingDayLTE) {
        foundData = this.findDatesGreaterThan(this.convertToUADateToCompare(weddingDayGTE));
      } else if(weddingDayLTE && !weddingDayGTE) {
        foundData = this.findDatesLessThan(this.convertToUADateToCompare(weddingDayLTE));
      } else if(weddingDayGTE && weddingDayLTE) {
        foundData = this.findDatesBetween(
          this.convertToUADateToCompare(weddingDayLTE),
          this.convertToUADateToCompare(weddingDayGTE)
        );
      }
      if(foundData && filterValues) {
        foundData = _filter(foundData, filterValues);
      } else {
        foundData = _filter(this.immutableData, filterValues);
      }
    } else {
      foundData = this.immutableData;
    }
    this.setState({ dataFoundByFilterWithOptions: foundData });
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
            <Filter name='name'
                    onFilter={(values) => this.doAdvancedFilter(values)}
                    placeholder='Search for name...'>
              <label>
                <span> From: </span>
                <div className='sv-select'>
                  <select name='from'>
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
                <span> Wedding day between: </span>
                <div className='sv-row--with-gutter'>
                  <div className='sv-column'>
                    <label>
                      <div className='sv-select'>
                        <input
                          name='weddingDayGTE'
                          placeholder='dd/mm/yyyy'
                          type='text'
                        />
                        <label>
                          <i className='fa fa-calendar'/>
                        </label>
                      </div>
                    </label>
                  </div>
                  <div className='sv-column'>
                    <label>
                      <div className='sv-select'>
                        <input
                          name='weddingDayLTE'
                          placeholder='dd/mm/yyyy'
                          type='text'
                         />
                        <label>
                          <i className='fa fa-calendar'/>
                        </label>
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
                <span>Worldly goods</span>
              </label>
              <label>
                <input name='worldlyGoods' type='checkbox' value='Bike' /> Bike
              </label>
              <label>
                <input name='worldlyGoods' type='checkbox' value='Car' /> Car
              </label>
              <label>
                <input name='worldlyGoods' type='checkbox' value='Helicopter' /> Helicopter
              </label>
              <label>
                <input name='worldlyGoods' type='checkbox' value='Mac' /> Mac
              </label>
            </Filter>
          </div>
        </div>
        <div>
          <DataTable data={this.state.dataFoundByFilterWithOptions}>
            <DataTableColumn dataKey='name'>Name</DataTableColumn>
            <DataTableColumn dataKey='from'>From</DataTableColumn>
            <DataTableColumn dataKey='gender'>Gender</DataTableColumn>
            <DataTableColumn dataKey='weddingDay'>Wedding day</DataTableColumn>
            <DataTableColumn dataKey='worldlyGoods'>Worldly goods</DataTableColumn>
          </DataTable>
        </div>
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
          <DataTableColumn dataKey='weddingDay'>Wedding Day</DataTableColumn>
          <DataTableColumn dataKey='worldlyGoods'>Worldly Goods</DataTableColumn>
        </DataTable>
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
