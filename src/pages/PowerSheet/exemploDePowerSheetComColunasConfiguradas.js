import React from 'React';
import { PowerSheet, SheetColumn } from 'syntec-apollo-11';

const dadosRecebidos = [
  { 
    id: 1, 
    responsavel: 'Rafaela_Braga@gmail.com',
    obrigacao: 'PIS',
    estado: 'RR',
    papel: 'user',
    valor: 11.21,
  },
  //...
];

class PowerSheetComColunasConfiguradas extends React.Component {

  //Função que retorna o valor formatado para uma coluna
  printPrice(row) {
    return `R$ ${parseFloat(row.valorPago).toFixed(2)}`;
  }

  //Função que retorna o valor formatado para as opções do filtro
  printPriceOnFilter(price) {
    return `R$ ${price}`;
  }

  render() {
    return (
      <div>
        <PowerSheet 
          containerHeight={290} 
          fetch={{url: 'url', method: 'GET'}}
          pageSize={10} 
          rowHeight={35}>
          <SheetColumn columnTitle='Codigo' dataKey='id' dataType='numeric' />
          <SheetColumn columnTitle='Responsável' dataKey='responsavel' searchable  />
          <SheetColumn columnTitle='Obrigação' dataKey='obrigacao'  searchable />
          <SheetColumn columnTitle='Estado' dataKey='estado'  searchable/>
          <SheetColumn columnTitle='Papel' dataKey='papel' searchable />
          <SheetColumn
            columnTitle='Valor'
            dataKey='valor'
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

PowerSheetComColunasConfiguradas.displayName = 'PowerSheetComColunasConfiguradas';
export default PowerSheetComColunasConfiguradas;