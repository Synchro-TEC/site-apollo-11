import React from 'react';
import {PowerTable, PowerColumn} from 'apollo-11';

class PowerTablePage extends React.Component {

  printPrice(row) {
    return `R$ ${row.price}`;
  }

  printPriceOnFilter(price) {
    return `R$ ${price}`;
  }

  printTotal(row) {
    return `R$ ${parseFloat(row.price * row.quantity).toFixed(2)}`;
  }

  render() {
    return (
      <div>
        <PowerTable dataUrl='http://localhost:3000/users' itensInViewPort={16} rowHeight={39}>
          <PowerColumn columnTitle='Codigo' dataKey='id' dataType='numeric' />
          <PowerColumn columnTitle='Nome' dataKey='firstName' searchable />
          <PowerColumn columnTitle='Papel' dataKey='papel' searchable />
          <PowerColumn columnTitle='Descrição' dataKey='text' searchable />
          <PowerColumn columnTitle='Endereço' dataKey='address' searchable />
          <PowerColumn
            columnTitle='Preço'
            dataKey='price'
            dataType='numeric'
            formatter={this.printPrice}
            formatterOnFilter={this.printPriceOnFilter}
            searchable />
          <PowerColumn columnTitle='Quantidade' dataKey='quantity' dataType='numeric' searchable />
          <PowerColumn columnTitle='Total' formatter={this.printTotal} />
        </PowerTable>
      </div>
    );
  }

}

export default PowerTablePage;
