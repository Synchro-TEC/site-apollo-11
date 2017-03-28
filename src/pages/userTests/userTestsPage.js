import React from 'react';
import { Filter, DataTable, DataTableColumn, Paginate } from 'apollo-11';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';

class UserTestsPage extends React.Component {

  constructor() {
    super();
    this.immutableData = [];
    this.dataWhenSearch = [];
    this.state = {
      dataForSimulateAPaginate: [],
      sizeOfData: 0,
      isSearching: false,
    };
  }

  componentDidMount() {
    this.getData('http://localhost:3000/tasks', {});
  }

  getData(url, params) {
    axios.get(url, params).then((response) => {
      this.immutableData = response.data;
      this.setState({
        sizeOfData: response.data.length,
        dataForSimulateAPaginate: response.data.slice(0,10),
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
    this.setState({ isSearching: values.valueOfSearch !== '' || Object.keys(values).length > 1 });
    let convertedFirstDate = this.convertToUADateToCompare(values.firstDate);
    let convertedWeddingDayDate = this.convertToUADateToCompare(values.weddingDay);
    let wordlyGoods = values.wordlyGoods;
    let hadABike, hadACar, hadAMac, hadAHelicopter, firstDateNumber, weddingDayNumber, wordlyGoodsString;

    if(convertedFirstDate && convertedWeddingDayDate) {
      firstDateNumber = convertedFirstDate.getTime();
      weddingDayNumber = convertedWeddingDayDate.getTime();
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

    let result = {};

    if(!_isEmpty(values)) {
      result = axios.get('http://localhost:3000/tasks', {
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
        this.dataWhenSearch = response.data;
        this.setState({
          dataForSimulateAPaginate: response.data.slice(0,10),
          sizeOfData: response.data.length,
        });
      });
    } else {
      result = axios.get('http://localhost:3000/tasks').then((response) => {
        this.setState({
          dataForSimulateAPaginate: response.data.slice(0,10),
          sizeOfData: response.data.length,
        });
      });
    }
  }

  paginateActionForAdvancedFilter(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;

    this.setState({
      dataForSimulateAPaginate: this.state.isSearching ?
        this.dataWhenSearch.slice(startOfSlice, endOfSlice):
        this.immutableData.slice(startOfSlice, endOfSlice),
    });
  }

  render() {
    return (
      <div className='dm-content'>
        <div className='sv-row'>
          <div className='sv-column'>
            <h3>Filter</h3>
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
                        <input
                          name='weddingDay'
                          placeholder='dd/mm/yyyy'
                          style={{'width': '100%'}}
                          type='text'
                        />
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
          <DataTable data={this.state.dataForSimulateAPaginate}>
            <DataTableColumn dataKey='name'>Name</DataTableColumn>
            <DataTableColumn dataKey='from'>From</DataTableColumn>
            <DataTableColumn dataKey='gender'>Gender</DataTableColumn>
            <DataTableColumn dataKey='firstDate'>First Date</DataTableColumn>
            <DataTableColumn dataKey='weddingDay'>Wedding day</DataTableColumn>
            <DataTableColumn dataKey='wordlyGoods'>Wordly Goods</DataTableColumn>
          </DataTable>
        </div>
        <Paginate
          onNextPage={(paginateInfo) => this.paginateActionForAdvancedFilter(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginateActionForAdvancedFilter(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.paginateActionForAdvancedFilter(paginateInfo)}
          ref='paginateForAdvancedFilter'
          totalSizeOfData={this.state.sizeOfData}
        />
      </div>
    );
  }

}

export default UserTestsPage;
