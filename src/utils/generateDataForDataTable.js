import _times from 'lodash/times';

let generateDataForDataTable = () => {  
  return _times(130, (i) => {
    return {
      id: i,
      task: 'Tarefa ' + i,
      priority: ['Crítica', 'Alta', 'Média', 'Baixa'][Math.floor((Math.random() * 4))],
    }     
  });
}

export { generateDataForDataTable };
