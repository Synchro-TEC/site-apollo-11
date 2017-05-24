import React from 'react';
import { PowerSheet, SheetColumn } from 'syntec-apollo-11';
import ShowCode from '../../components/ShowCode';
import { PrismCode } from 'react-prism';
import _uniqueId from 'lodash/uniqueId';
import axios from 'axios';
import { generateDataForPowerTable } from '../../utils/generateDataForPowerTable';

class PowerSheetPage extends React.Component {

  constructor(props) {
    super();
    this.data = generateDataForPowerTable();
  }

  printPrice(row) {
    return `R$ ${row.preco}`;
  }

  printPriceOnFilter(price) {
    return `R$ ${price}`;
  }

  printTotal(row) {
    return `R$ ${parseFloat(row.preco * row.quantidade).toFixed(2)}`;
  }

  render() {
    return (
      <div className='dm-content'>
        <h3> PowerSheet </h3>
          <PowerSheet
            containerHeight={495}
            fetch={{url: 'http://localhost:3003/users', method: 'get'}}
            pageSize={20}
          >
            <SheetColumn columnTitle='Codigo' dataKey='codigo' dataType='numeric' />
            <SheetColumn columnTitle='Nome' dataKey='name.first' searchable />
            <SheetColumn columnTitle='Papel' dataKey='papel' searchable />
          </PowerSheet>
      </div>
    );
  }

}

PowerSheetPage.displayName = 'PowerSheetPage';
export default PowerSheetPage;
