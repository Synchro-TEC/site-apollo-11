import React from 'react';
import { Filter } from 'apollo-11';

class FilterWithOptionsExample extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Filter>
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
        </Filter>
      </div>
    );
  }
}

FilterWithOptionsExample.displayName = 'FilterWithOptionsExample';

export default FilterWithOptionsExample;