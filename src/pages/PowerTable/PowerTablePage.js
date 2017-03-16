import React from 'react';
import {PowerTable, PowerColumn} from 'apollo-11';

class PowerTablePage extends React.Component {

  printPrice(row) {
    return `R$ ${row.price}`;
  }

  printTotal(row) {
    return `R$ ${row.price * row.quantity}`;
  }

  render() {
    return (
      <div>
        <PowerTable dataUrl='http://localhost:3000/users' itensInViewPort={16} rowHeight={39.466}>
          <PowerColumn columnTitle='Codigo' dataKey='id' />
          <PowerColumn columnTitle='Nome' dataKey='firstName' searchable />
          <PowerColumn columnTitle='Papel' dataKey='papel' searchable />
          <PowerColumn columnTitle='Descrição' dataKey='text' searchable />
          <PowerColumn columnTitle='Endereço' dataKey='address' searchable />
          <PowerColumn columnTitle='Preço' dataKey='price' formatter={this.printPrice} />
          <PowerColumn columnTitle='Quantidade' dataKey='quantity' />
          <PowerColumn columnTitle='Total' formatter={this.printTotal} />
        </PowerTable>
      </div>
    );
  }

}

export default PowerTablePage;
