import React from 'react';
import { Filter } from 'apollo-11';

class FilterWithOptionsExample extends React.Component {

  constructor(props){
    super(props);
  }

  doingTheFiltering(values) {
    // Do something with values of filter options and search
  }

  cleaningFields() {
    // Function to execute when user clear all fields
  }

  render() {
    return (
      <div>
        <Filter
            applyFilterButtonLabel='The value to applyFilter button'
            cancelButtonLabel='The value to cancel button'
            clearAllButtonLabel='The value to clearAll button'
            filterButtonLabel='The value to filter button'
            name='searchValue'
            onClearAll={() => this.cleaningFields()}
            onFilter={(values) => this.doingTheFiltering(values)}>
          <div className='sv-row--with-gutter'>
            <div className='sv-column'>
              <label>
                <span>Gender:</span>
                <div className='sv-select'>
                  <select name='gender'>
                    <option value=''>Please, select</option>
                    <option value='M'>Male</option>
                    <option value='F'>Female</option>
                  </select>
                  <label><i className='fa fa-angle-down fa-fw'/></label>
                </div>
              </label>
            </div>
            <div className='sv-column'>
              <label>
                <span>Type:</span>
                <div className='sv-select'>
                  <select name='type'>
                    <option value=''/>
                    <option value='Master'>Master</option>
                    <option value='Senior'>Senior</option>
                  </select>
                  <label>
                    <i className='fa fa-angle-down fa-fw'/>
                  </label>
                </div>
              </label>
            </div>
          </div>
          <label>
            <span>Age</span>
          </label>
          <label>
            <input name='radioName' type='radio'  value='15' /> 15
          </label>
          <label>
            <input name='radioName' type='radio'  value='25' /> 25
          </label>
          <label>
            <input name='radioName' type='radio' value='50' /> 50
          </label>
          <label>
            <span>Worldly goods</span>
          </label>
          <label>
            <input defaultValue='bikeValue' name='checkBoxName' type='checkBox' /> Have a bike
          </label>
          <label>
            <input defaultValue='carValue' name='checkBoxName' type='checkbox' /> Have a car
          </label>
          <label>
            <input defaultValue='videoGameValue' name='checkBoxName' type='checkbox' /> Have a videogame
          </label>
        </Filter>
      </div>
    );
  }
}

FilterWithOptionsExample.displayName = 'FilterWithOptionsExample';

export default FilterWithOptionsExample;
