/**
 * Created by gnf on 11/01/17.
 */
import React from 'react';
import { Filter } from 'apollo-11';

class FilterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  search(values) {
    console.log(values);
  }

  render() {
    return (
      <div className='dm-content'>
        <h3>Filter</h3>
        <h6 className='sv-vertical-marged'>
          Filter is a customizable search filter.
        </h6>
        <Filter onSearch={(obj) => this.search(obj) }>
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
            <span>Age radio</span>
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
            <span>Age checkbox</span>
          </label>
          <label>
            <input name='checkBoxName' type='checkbox'  value='15' /> 15
          </label>
          <label>
            <input name='checkBoxName' type='checkbox'  value='25' /> 25
          </label>
          <label>
            <input name='checkBoxName' type='checkbox' value='50' /> 50
          </label>

          <label>
            <span>Another age </span>
          </label>
          <label>
            <input name='checkBoxName1' type='checkbox'  value='15' /> 15
          </label>
          <label>
            <input name='checkBoxName1' type='checkbox'  value='25' /> 25
          </label>
          <label>
            <input name='checkBoxName1' type='checkbox' value='50' /> 50
          </label>
        </Filter>
      </div>
    );
  }
}

FilterPage.displayName = 'FilterPage';

export default FilterPage;