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
        dataForAdvancedFilter: response.data.slice(0,10),
      });
    });
  }

  simpleFilter(value) {
    let result = axios.get('http://localhost:3000/tasks', {
      params: {
        description_like: value,
      },
    })
    .then((response) => {
      this.setState({data: response.data.slice(0,10)});
    });
  }

  advancedFilter(values) {
    let result = axios.get('http://localhost:3000/tasks', {
      params: {
        description_like: values.valueOfSearch,
        priority: values.priority,
        note: values.note,
      },
    })
    .then((response) => {
      this.setState({dataForAdvancedFilter: response.data.slice(0,10)});
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
                    placeholder="I'm a filter with options!">
              <div className='sv-row--with-gutter'>
                <div className='sv-column'>
                  <label>
                    <span>Priority:</span>
                    <div className='sv-select'>
                      <select name='priority'>
                        <option value=''/>
                        <option value='Critical'>Critical</option>
                        <option value='High'>High</option>
                        <option value='Medium'>Medium</option>
                        <option value='Low'>Low</option>
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
                <span> Note </span>
                <input name='note' type='text'/>
              </label>
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
        <div className='sv-vertical-marged-50'>
          <DataTable data={this.state.dataForAdvancedFilter}>
            <DataTableColumn dataKey='task'>Task</DataTableColumn>
            <DataTableColumn dataKey='description'>Descrição</DataTableColumn>
            <DataTableColumn dataKey='note'>Nota</DataTableColumn>
            <DataTableColumn dataKey='priority'>Prioridade</DataTableColumn>
            <DataTableColumn dataKey='startDate'>Start Date</DataTableColumn>
            <DataTableColumn dataKey='completeDate'>Complete Date</DataTableColumn>
          </DataTable>
        </div>
        <Paginate
          onNextPage={(paginateInfo) => this.paginateActionForAdvancedFilter(paginateInfo)}
          onPreviousPage={(paginateInfo) => this.paginateActionForAdvancedFilter(paginateInfo)}
          onSelectASpecifPage={(paginateInfo) => this.paginateActionForAdvancedFilter(paginateInfo)}
          totalSizeOfData={50}
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
        <div className='sv-vertical-marged-50'>
          <DataTable data={this.state.data}>
            <DataTableColumn dataKey='task'>Task</DataTableColumn>
            <DataTableColumn dataKey='description'>Descrição</DataTableColumn>
            <DataTableColumn dataKey='note'>Nota</DataTableColumn>
            <DataTableColumn dataKey='priority'>Prioridade</DataTableColumn>
            <DataTableColumn dataKey='startDate'>Start Date</DataTableColumn>
            <DataTableColumn dataKey='completeDate'>Complete Date</DataTableColumn>
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
