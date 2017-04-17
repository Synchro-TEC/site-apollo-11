import React from 'react';
import { DataTable, DataTableColumn } from 'apollo-11';

const dados = [
  { tarefa: 'Tarefa 1', prioridade: 'Crítica' },
  { tarefa: 'Tarefa 2', prioridade: 'Baixa' },
  { tarefa: 'Tarefa 3', prioridade: 'Média' },
  { tarefa: 'Tarefa 4', prioridade: 'Alta' },
  { tarefa: 'Tarefa 5', prioridade: 'Crítica' },
];

class ExemploDeDataTableComColunaSimples extends React.Component {

  render() {
    return (
      <div>
        <DataTable data={dados}>
          <DataTableColumn dataKey='tarefa'>Tarefa</DataTableColumn>
          <DataTableColumn dataKey='prioridade'>Prioridade</DataTableColumn>
        </DataTable>
      </div>
    );
  }

}

ExemploDeDataTableComColunaSimples.displayName = 'ExemploDeDataTableComColunaSimples';
export default ExemploDeDataTableComColunaSimples;
