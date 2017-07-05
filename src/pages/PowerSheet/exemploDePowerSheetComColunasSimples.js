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

class PowerSheetComColunasSimples extends React.Component {
  render() {
    return (
      <div>
        <PowerSheet containerHeight={290} fetch={{data: powerSheetData}} pageSize={10} rowHeight={35}>
          <SheetColumn columnTitle='Código' dataKey='id' />
          <SheetColumn columnTitle='Nome' dataKey='nome' />
          <SheetColumn columnTitle='Privilégio' dataKey='privilegio' />
        </PowerSheet>
      </div>
    );
  }
}

PowerSheetComColunasSimples.displayName = 'PowerSheetComColunasSimples';
export default PowerSheetComColunasSimples;