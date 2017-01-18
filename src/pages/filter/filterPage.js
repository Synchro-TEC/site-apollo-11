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
    this.state = {prettyValues: {}}
  }

  search(values) {
    this.setState({
      prettyValues: values,
    });
  }

  render() {
    return (
      <div className='dm-content'>
        <div className='sv-row'>
          <div className='sv-column'>
            <h3>Filter</h3>
            <h6 className='sv-vertical-marged'>
              Filter is a customizable search filter. Can you put checkbox, radio and select input types. It returns something like that:
            </h6>
            <pre>
            {JSON.stringify(this.state.prettyValues, undefined, 2)}
            </pre>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column sv-vertical-marged-10'>
            <Filter placeholder="I'm a filter with filter options!" onSearch={(obj) => this.search(obj)}>
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

