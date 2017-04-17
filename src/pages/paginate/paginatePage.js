import React from 'react';
import { Paginate, DataTable, DataTableColumn } from 'apollo-11';
import { generateData } from '../../utils/generateData';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';

class PaginatePage extends React.Component {

  constructor(props) {
    super(props);
    this.dataToPaginateAList = [
      {task: 'Task 1', priority: 'Critical'},
      {task: 'Task 2', priority: 'Critical'},
      {task: 'Task 3', priority: 'Low'},
      {task: 'Task 4', priority: 'High'},
      {task: 'Task 5', priority: 'Medium'},
      {task: 'Task 6', priority: 'High'},
      {task: 'Task 7', priority: 'Critical'},
      {task: 'Task 8', priority: 'Low'},
      {task: 'Task 9', priority: 'Medium'},
      {task: 'Task 10', priority: 'Critical'},
      {task: 'Task 11', priority: 'High'},
      {task: 'Task 12', priority: 'Critical'},
      {task: 'Task 13', priority: 'Medium'},
      {task: 'Task 14', priority: 'Critical'},
      {task: 'Task 15', priority: 'Low'},
      {task: 'Task 16', priority: 'Medium'},
      {task: 'Task 17', priority: 'High'},
      {task: 'Task 18', priority: 'Medium'},
      {task: 'Task 19', priority: 'Low'},
      {task: 'Task 20', priority: 'Critical'},
    ];
    this.dataToPaginateWithOptions = generateData();
    this.state = {
      dataToPaginateAList: this.dataToPaginateAList.slice(0,5),
      dataToPaginateWithOptions: this.dataToPaginateWithOptions.slice(0,5),
    }
  }

  doPaginate(paginateInfo) {
    let startOfSlice = paginateInfo.offset;
    let endOfSlice = paginateInfo.offset + paginateInfo.limit;
    let filteredData = this.dataToPaginateAList.slice(startOfSlice, endOfSlice);
    return filteredData;
  }

  paginateAction(paginateInfo) {
    this.setState({dataToPaginateAList: this.doPaginate(paginateInfo)});
  }

  powerfullPaginateAction(paginateInfo) {
    this.setState({dataToPaginateWithOptions: this.doPaginate(paginateInfo)});
  }

  render() {

    let itemsOfPaginate = this.state.dataToPaginateAList.map((task, i) => {
      return <li key={i} style={{'marginBottom': '4px'}}> {task.task} - {task.priority}</li>;
    });

    return (
      <div className='dm-content'>
        <div className='sv-row'>
          <div className='sv-column'>
            <h3> Paginate </h3>
            <h6 className='sv-vertical-marged'>
              Monta um paginador que pode ter um navegador de páginas ou não.
            </h6>
            <p>
              Será necessário dividir os dados de acordo com a quantidade desejada por página para o
              carregamento inicial mostrar a quantidade configurada.
              A propriedade <b> recordsByPage </b> apenas servirá para o componente realizar
              os cálculos quando o usuário deixar a primeira página.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Simple paginate
            </h5>
            <p>
              A simple paginate have two properties to receive callbacks,
              <b> onNextPage </b> and <b> onPreviousPage </b>
              where you can get the value of currentPage, limit and offset when
              these actions are triggered.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Paginate />
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./simplePaginateExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Paginate with options
            </h5>
            <p>
              If you want options to select a specif page, you have to add
              a property to your component named <b>onSelectASpecifPage</b>. This property
              will receive your callback function, and return the same information of
              onNext and onPrevious explained before.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Paginate
              onNextPage={(paginateInfo) => this.powerfullPaginateAction(paginateInfo)}
              onPreviousPage={(paginateInfo) => this.powerfullPaginateAction(paginateInfo)}
              onSelectASpecifPage={(paginateInfo) => this.powerfullPaginateAction(paginateInfo)}
              recordsByPage={5}
              totalSizeOfData={this.dataToPaginateWithOptions.length}
            />
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./paginateWithOptionsExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <h5 className='bold'>
              Paginate is flexible
            </h5>
            <p>
              You don't have to use the Paginate aways together with DataTable. Below,
              the component was used in a single list.
            </p>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <div className='sv-text-center'>
              <ul>
                {itemsOfPaginate}
              </ul>
            </div>
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <Paginate
              onNextPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              onPreviousPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              onSelectASpecifPage={(paginateInfo) => this.paginateAction(paginateInfo)}
              recordsByPage={5}
              totalSizeOfData={this.dataToPaginateAList.length}
            />
          </div>
        </div>
        <div className='sv-row'>
          <div className='sv-column'>
            <ShowCode>
              <PrismCode className='language-js'>
                {require('!raw-loader!./paginateWithoutDataTableExample.js')}
              </PrismCode>
            </ShowCode>
          </div>
        </div>
      </div>
    );
  }

}

export default PaginatePage;
