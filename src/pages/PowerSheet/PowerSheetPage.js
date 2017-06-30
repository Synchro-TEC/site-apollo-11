import React from 'react';
import { PowerSheet, SheetColumn } from 'syntec-apollo-11';
import ShowCode from '../../components/ShowCode';
import { PrismCode } from 'react-prism';
import { generateDataForPowerTable } from '../../utils/generateDataForPowerTable';

class PowerSheetPage extends React.Component {

  constructor() {
    super();    
  }

  printPrice(row) {
    return `R$ ${parseFloat(row.valorPago).toFixed(2)}`;
  }

  printPriceOnFilter(price) {
    return `R$ ${price}`;
  }

  // printTotal(row) {
  //     return `R$ ${parseFloat(row.preco * row.quantidade).toFixed(2)}`;
  // }

  render() {    
    return (
      <div className='dm-content'>

        <h3> PowerSheet </h3>
          <PowerSheet
            containerHeight={695}
            fetch={{url: 'http://localhost:3000/apuracoes', method: 'get'}}
            pageSize={10}
            rowHeight={35}
          >
            <SheetColumn columnTitle='Codigo' dataKey='id' dataType='numeric' />
            <SheetColumn columnTitle='Responsável' dataKey='responsavel' searchable  />
            <SheetColumn columnTitle='Obrigação' dataKey='obgricacao'  searchable />
            <SheetColumn columnTitle='Estado' dataKey='estado'  searchable/>
            <SheetColumn columnTitle='Papel' dataKey='papel' searchable />

            <SheetColumn
              columnTitle='Valor'
              dataKey='valorPago'
              dataType='numeric'
              formatter={this.printPrice}
              formatterOnFilter={this.printPriceOnFilter}
              searchable
              width={120}
            />

          </PowerSheet>
      </div>
    );
  }

}

PowerSheetPage.displayName = 'PowerSheetPage';
export default PowerSheetPage;
