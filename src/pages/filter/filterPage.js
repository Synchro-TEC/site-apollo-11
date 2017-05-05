/**
 * Created by gnf on 11/01/17.
 */
import React from 'react';
import { Filter, DataTable, DataTableColumn } from 'syntec-apollo-11';
import { PrismCode } from 'react-prism';
import ShowCode from '../../components/ShowCode';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import _assign from 'lodash/assign';

class FilterPage extends React.Component {

  constructor() {
    super();
    this.immutableData = [
      {
        nome: 'Lorraine Barros',
        nacionalidade: 'Rússia',
        sexo: 'Feminino',
        diaDoCasamento: '02/03/2017',
        bens: 'Bicicleta, carro, helicóptero, mac',
        temUmaBicicleta: true,
        temUmCarro: true,
        temUmHelicoptero: true,
        temUmMac: true,
      },
      {
        nome: 'Núbia Xavier',
        nacionalidade: 'Estados Unidos',
        sexo: 'Feminino',
        diaDoCasamento: '28/02/2010',
        bens: 'Helicóptero',
        temUmHelicoptero: true,
        temUmMac: false,
        temUmaBicicleta: false,
        temUmCarro: false,
      },
      {
        nome: 'Vitória Braga Filho',
        nacionalidade: 'Austrália',
        sexo: 'Feminino',
        diaDoCasamento: '08/02/2005',
        bens: 'Bicicleta',
        temUmaBicicleta: true,
        temUmMac: false,
        temUmCarro: false,
        temUmHelicoptero: false,
      },
      {
        nome: 'Ladislau Braga',
        nacionalidade: 'Nova Zelândia',
        sexo: 'Masculino',
        diaDoCasamento: '10/01/2000',
        temUmaBicicleta: true,
        temUmMac: true,
        temUmHelicoptero: false,
        temUmCarro: false,
        bens: 'Bicicleta, mac',
      },
      {
        nome: 'Pedro Saraiva',
        nacionalidade: 'Itália',
        sexo: 'Masculino',
        diaDoCasamento: '07/07/1996',
        bens: 'Bicicleta, carro, helicóptero',
        temUmaBicicleta: true,
        temUmCarro: true,
        temUmHelicoptero: true,
        temUmMac: false,
      },
    ];
    this.state = {
      dataFoundByFilterWithoutOptions: this.immutableData,
      dataFoundByFilterWithOptions: this.immutableData,
    };
  }

  /**
   * toDate - description
   * Converte uma data dd/mm/aaaa para um tipo date
   * @param  {type} dateToConvert description
   * @return {type}               description
   */
  toDate(dateToConvert) {
    if(dateToConvert) {
      const regExp = new RegExp('([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})');
      return new Date(dateToConvert.replace(regExp, '$2/$1/$3'));
    }
  }

  /**
   * mountWordlyGoodsObject - description
   * Monta um objeto com variaveis booleanas baseando-se nos valores de bens
   * @param  {type} filterValues description
   * @return {type}              description
   */
  mountWordlyGoodsObject(filterValues) {
    let bens = {
      temUmaBicicleta: false,
      temUmCarro: false,
      temUmMac: false,
      temUmHelicoptero: false,
    };

    for(let i = 0; i<filterValues.bens.length; i++) {
      switch (filterValues.bens[i]) {
        case 'bicicleta':
          bens.temUmaBicicleta = true;
        break;
        case 'carro':
          bens.temUmCarro = true;
        break;
        case 'mac':
          bens.temUmMac = true;
        break;
        case 'helicóptero':
          bens.temUmHelicoptero = true;
        break;
      }
    }

    return bens;
  }


  /**
   * findDatesLesserThan - description
   * Retorna dados filtrados por uma data menor do que a recebida
   * @param  {type} date description
   * @return {type}      description
   */
  findDatesLesserThan(date) {
    return _filter(this.immutableData, (item) => {
      return date >= this.toDate(item.diaDoCasamento);
    });
  }

  /**
   * findDatesGreaterThan - description
   * Retorna dados filtrados por uma data maior do que a recebida
   * @param  {type} date description
   * @return {type}      description
   */
  findDatesGreaterThan(date) {
    return _filter(this.immutableData, (item) => {
      return date <= this.toDate(item.diaDoCasamento);
    });
  }


  /**
   * findDatesBetween - description
   * Retorna dados filtrados por duas datas
   * @param  {type} dateLTE description
   * @param  {type} dateGTE description
   * @return {type}         description
   */
  findDatesBetween(dateLTE, dateGTE) {
    return _filter(this.immutableData, (item) => {
      let itemWeddingDay = this.toDate(item.diaDoCasamento);
      return dateGTE <= itemWeddingDay && dateLTE >= itemWeddingDay;
    });
  }

  prepareFilter(values) {
    let filterValues = {};

    for(let property in values) {
      switch (property) {
        case 'nacionalidade':
          filterValues.nacionalidade = values.nacionalidade;
        break;
        case 'sexo':
          filterValues.sexo = values.sexo;
        break;
        case 'bens':
          filterValues = _assign(filterValues, this.mountWordlyGoodsObject(values));
        break;
      }
    }

    return filterValues;
  }


  /**
   * findByName - description
   * Busca pelo nome no array recebido e retorna o array filtrado caso o nome passado
   * nao seja vazio, caso seja, os dados são retornados sem filtro
   * @param  {type} name description
   * @param  {type} data description
   * @return {type}      description
   */
  findByName(nome, data) {
    if(nome && nome !== '') {
      return _filter(data, (item) => {
        return item.nome.includes(nome);
      });
    } else {
      return data;
    }
  }

  doAdvancedFilter(values) {
    let { diaDoCasamentoGTE, diaDoCasamentoLTE } = values;
    let foundData;

    if(!_isEmpty(values)) {
      let filterValues = this.prepareFilter(values);
      let comparableDateGTE = this.toDate(diaDoCasamentoGTE);
      let comparableDateLTE = this.toDate(diaDoCasamentoLTE);

      if(comparableDateGTE && !comparableDateLTE) {
        foundData = this.findDatesGreaterThan(comparableDateGTE);
      } else if(comparableDateLTE && !comparableDateGTE) {
        foundData = this.findDatesLesserThan(comparableDateLTE);
      } else {
        foundData = this.findDatesBetween(comparableDateLTE, comparableDateGTE);
      }

      if(!_isEmpty(foundData)) {
        foundData = this.findByName(values.nome, foundData);
      } else {
        foundData = this.findByName(values.nome, this.immutableData);
      }

      foundData = _filter(foundData, filterValues);
    } else {
      foundData = this.immutableData;
    }

    this.setState({ dataFoundByFilterWithOptions: foundData });
  }

  simpleFilter(value) {
    let foundData = _filter(this.immutableData, (item) => {
      return item.nome.includes(value);
    });

    this.setState({ dataFoundByFilterWithoutOptions: foundData });
  }

  render() {
    return (
      <div className='dm-content'>
        <h3>Filter</h3>
        <p>
          Quando o filtro é aplicado, a propriedade chamada <b>onFilter</b> retorna um objeto com o
          estado atual do filtro. Quando os campos são limpos, a propriedade chamada <b> onClearAll </b>
          executa um callback caso este exista. Se você optar pelo filtro com opções e estas forem
          diferentes de select, radio ou checkbox, se fará obrigatório um callback para a propriedade
          onClearAll.
        </p>
        <h5 className='bold'>
          Filtro com opções
        </h5>
        <p>
          Você pode configurá-las do jeito que quiser, desde que cada
          input possua a propriedade "name", inclusive o componente filtro.
          Se você deseja um conjunto de opções para um checkbox, basta dar às opções o mesmo nome.
          O nome de um input será a sua chave no objeto de retorno da propriedade onFilter.
        </p>
        <Filter name='nome'
          onFilter={(values) => this.doAdvancedFilter(values)}
          placeholder='Buscar por nome...'>
          <label>
            <span> Nacionalidade: </span>
            <div className='sv-select'>
              <select name='nacionalidade'>
                <option value=''/>
                <option value='Itália'>Itália</option>
                <option value='Estados Unidos'>Estados Unidos</option>
                <option value='Austrália'>Austrália</option>
                <option value='Rússia'>Rússia</option>
                <option value='Nova Zelândia'>Nova Zelândia</option>
              </select>
              <label>
                <i className='fa fa-angle-down fa-fw'/>
              </label>
            </div>
          </label>
          <label>
            <span> Dia de casamento entre: </span>
            <div className='sv-row--with-gutter'>
              <div className='sv-column'>
                <label>
                  <div className='sv-select'>
                    <input
                      name='diaDoCasamentoGTE'
                      placeholder='dd/mm/yyyy'
                      type='text'
                    />
                    <label style={{color: '#648391'}}>
                      <i className='fa fa-calendar'/>
                    </label>
                  </div>
                </label>
              </div>
              <div className='sv-column'>
                <label>
                  <div className='sv-select'>
                    <input
                      name='diaDoCasamentoLTE'
                      placeholder='dd/mm/yyyy'
                      type='text'
                     />
                    <label style={{color: '#648391'}}>
                      <i className='fa fa-calendar'/>
                    </label>
                  </div>
                </label>
              </div>
            </div>
          </label>
          <label>
            <span>Sexo:</span>
          </label>
          <label>
            <input name='sexo' type='radio' value='Masculino' /> Masculino
          </label>
          <label>
            <input name='sexo' type='radio' value='Feminino' /> Feminino
          </label>
          <label>
            <span>Bens materiais: </span>
          </label>
          <label>
            <input name='bens' type='checkbox' value='bicicleta' /> Bicicleta
          </label>
          <label>
            <input name='bens' type='checkbox' value='carro' /> Carro
          </label>
          <label>
            <input name='bens' type='checkbox' value='helicóptero' /> Helicóptero
          </label>
          <label>
            <input name='bens' type='checkbox' value='mac' /> Mac
          </label>
        </Filter>
        <div className='sv-vertical-marged-15'/>
        <DataTable data={this.state.dataFoundByFilterWithOptions}>
          <DataTableColumn dataKey='nome'>Nome</DataTableColumn>
          <DataTableColumn dataKey='nacionalidade'>Nacionalidade</DataTableColumn>
          <DataTableColumn dataKey='sexo'>Sexo</DataTableColumn>
          <DataTableColumn dataKey='diaDoCasamento'>Dia do Casamento</DataTableColumn>
          <DataTableColumn dataKey='bens'>Bens</DataTableColumn>
        </DataTable>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDeFiltroComOpcoes.js')}
          </PrismCode>
        </ShowCode>
        <div className='sv-vertical-marged-25'/>
        <p>
          Se o usuário busca por exemplo, o italiano "Pedro Saraiva" que possui
          uma bicicleta, um carro e um helicóptero, o objeto de retorno seria:
        </p>
        <div className='dm-code-container'>
          <pre>
            <PrismCode className='language-js'>
              {require('!raw-loader!./exemploDeRetornoDoFiltroComOpcoes.js')}
            </PrismCode>
          </pre>
        </div>
        <div className='sv-vertical-marged-25'/>
        <h5 className='bold'>
          Filtro simples
        </h5>
        <p>
          Com esta configuração, você obterá apenas o valor atual do campo de busca
          retornado pela propriedade onFilter. A busca acontece quando o usuário começa a digitar.
          Repare que, neste caso não se faz necessário nomear o filtro como fizemos no filtro
          com opções.
        </p>
        <Filter
          onFilter={(value) => this.simpleFilter(value)}
          placeholder='Buscar por nome...' />
        <div className='sv-vertical-marged-15'/>
        <DataTable data={this.state.dataFoundByFilterWithoutOptions}>
          <DataTableColumn dataKey='nome'>Nome</DataTableColumn>
          <DataTableColumn dataKey='nacionalidade'>Nacionalidade</DataTableColumn>
          <DataTableColumn dataKey='sexo'>Sexo</DataTableColumn>
          <DataTableColumn dataKey='diaDoCasamento'>Dia do casamento</DataTableColumn>
          <DataTableColumn dataKey='bens'>Bens</DataTableColumn>
        </DataTable>
        <ShowCode>
          <PrismCode className='language-js'>
            {require('!raw-loader!./exemploDeFiltroSemOpcoes.js')}
          </PrismCode>
        </ShowCode>
      </div>
    );
  }
}

FilterPage.displayName = 'FilterPage';

export default FilterPage;
