/**
 * Created by gnf on 11/01/17.
 */
import React from 'react';
import { Filter } from 'apollo-11';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';

class FilterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {prettyValuesForFilterWithOptions: {}}
  }

  search(values, e) {
    console.log(e);
    this.setState({
      prettyValuesForFilterWithOptions: values,
    });
  }

  render() {
    return (
      <div className='dm-content'>
        <div className='sv-row'>
          <div className='sv-column'>
            <h3>Filter</h3>
            <h6 className='sv-vertical-marged'>
              Filter is a customizable search filter. Below, you can see a example of filter with options: (apply filter to see the result)
            </h6>
            <pre>
              And it returns something like that: {JSON.stringify(this.state.prettyValuesForFilterWithOptions, undefined, 2)}
            </pre>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column sv-vertical-marged-10'>
            <Filter onSearch={(obj, e) => this.search(obj, e)} placeholder="I'm a filter with filter options!">
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
        <div className='sv-vertical-marged-50'/>
        <div className='sv-row'>
          <div className='sv-column'>
            <h6 className='sv-vertical-marged'>
              Below, you can see a example of single filter without options: (press enter to see the result)
            </h6>
            <pre>
              And it returns something like that: {JSON.stringify({}, undefined, 2)}
            </pre>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Filter placeholder="I'm just a single filter!" />
          </div>
        </div>
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

