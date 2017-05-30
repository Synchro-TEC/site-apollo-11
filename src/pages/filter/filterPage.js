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
import _remove from 'lodash/remove';

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

    this.filterValues = {};
  }

  /**
   * toDate - description
   * Converte uma data dd/mm/aaaa para o formato padrão do tipo date: mm/dd/aaaa,
   * para conseguir instanciar uma data com este valor.
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
   * findDatesLesserThan - description
   * Retorna os dados com data menor do que a data recebida
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
   * Retorna os dados com data maior do que a data recebida
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
   * Retorna os dados com data entre as duas datas recebidas 
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

  doAdvancedFilter(value) {    
    let foundData = this.immutableData;

    let comparableDateGTE = this.toDate(this.refs.diaDoCasamentoGTE.value);
    let comparableDateLTE = this.toDate(this.refs.diaDoCasamentoLTE.value);

    if(!comparableDateLTE && comparableDateGTE) {        
      foundData = this.findDatesGreaterThan(comparableDateGTE);        
    } else if(comparableDateLTE && !comparableDateGTE) {        
      foundData = this.findDatesLesserThan(comparableDateLTE);        
    } else {
      foundData = this.findDatesBetween(comparableDateLTE, comparableDateGTE);              
    }

    if(!_isEmpty(foundData)) {
      foundData = this.findByName(value, foundData);
    } else {
      foundData = this.findByName(value, this.immutableData);
    }

    if(!_isEmpty(this.filterValues)) {
      foundData = _filter(foundData, this.filterValues);      
    }

    this.setState({
      dataFoundByFilterWithOptions: foundData,
    });    
  }

  simpleFilter(value) {    
    this.setState({
      dataFoundByFilterWithoutOptions: this.findByName(value, this.immutableData),
    });
  }

  clearAll(value) {    
    this.filterValues = {};
    this.refs.mac.checked = false;
    this.refs.carro.checked = false;
    this.refs.helicoptero.checked = false;
    this.refs.bicicleta.checked = false;
    this.refs.sexoMasculino.checked = false;
    this.refs.sexoFeminino.checked = false;
    this.refs.diaDoCasamentoGTE.value = '';
    this.refs.diaDoCasamentoLTE.value = '';
    this.refs.nacionalidade.value = '';    
    this.doAdvancedFilter(value);    
  }

  mountWordlyGoodsObject(value) {    
    let wordlyGoods = _assign({ 
      temUmaBicicleta: this.refs.bicicleta.checked, 
      temUmCarro: this.refs.carro.checked, 
      temUmMac: this.refs.mac.checked, 
      temUmHelicoptero: this.refs.helicoptero.checked, 
    }, {});

    this.filterValues = _assign(this.filterValues, wordlyGoods);

    if(!wordlyGoods.temUmaBicicleta &&
      !wordlyGoods.temUmCarro &&
      !wordlyGoods.temUmMac &&
      !wordlyGoods.temUmHelicoptero) {
      delete this.filterValues['temUmaBicicleta'];   
      delete this.filterValues['temUmCarro'];
      delete this.filterValues['temUmMac'];
      delete this.filterValues['temUmHelicoptero'];
    }    
  }

  mountFilterObject(value) {              
    this.filterValues = _assign(this.filterValues, value);
    if(value['nacionalidade'] == '') {
      delete this.filterValues['nacionalidade'];
    }        
    delete this.filterValues['bens'];
  }

  render() {        
    return (
      <div className='dm-content'>
        <h3>Filter</h3>
        <p>
          Quando o filtro é aplicado, a propriedade chamada <b> onFilter </b> retorna o valor
          do campo de busca. Quando o campo de busca é limpo, a mesma função da propriedade
          onFilter é executada retornando um valor vazio.
        </p>
        <h5 className='bold'>
          Filtro com opções
        </h5>
        <p>
          Você pode configurá-las do jeito que quiser, basta colocar as opções dentro do
          componente. Com esta configuração, existirá uma propriedade chamada <b> onClearAll </b>
          que executará a função recebida como propriedade quando as opções do filtro forem limpas
          e retornará o valor do campo de busca.
        </p>
        <Filter name='nome'
          onClearAll={(value) => this.clearAll(value)}
          onFilter={(value) => this.doAdvancedFilter(value)}          
          placeholder='Buscar por nome...'>
          <label>
            <span> Nacionalidade: </span>
            <div className='sv-select'>
              <select 
                onChange={(e) => this.mountFilterObject({'nacionalidade': e.target.value})}
                ref='nacionalidade'>
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
                  <input
                    placeholder='dd/mm/yyyy'
                    ref='diaDoCasamentoGTE'
                    type='text'
                  />                  
                </label>
              </div>
              <div className='sv-column'>
                <label>                  
                  <input
                    placeholder='dd/mm/yyyy'
                    ref='diaDoCasamentoLTE'
                    type='text'
                   />                    
                </label>
              </div>
            </div>
          </label>
          <label>
            <span>Sexo:</span>
          </label>
          <label>
            <input              
              name='sexo'
              onChange={(e) => this.mountFilterObject({'sexo': e.target.value})}
              ref='sexoMasculino'        
              type='radio'
              value='Masculino'
            /> Masculino
          </label>
          <label>
            <input              
              name='sexo'        
              onChange={(e) => this.mountFilterObject({'sexo': e.target.value})}
              ref='sexoFeminino'
              type='radio' 
              value='Feminino' 
            /> Feminino
          </label>
          <label>
            <span>Bens materiais: </span>
          </label>
          <label>
            <input              
              onChange={(e) => this.mountWordlyGoodsObject(e.target)}
              ref='bicicleta'
              type='checkbox'
              value='bicicleta'
            /> Bicicleta
          </label>
          <label>
            <input               
              onChange={(e) => this.mountWordlyGoodsObject(e.target)}
              ref='carro' 
              type='checkbox' 
              value='carro' 
            /> Carro
          </label>
          <label>
            <input                
              onChange={(e) => this.mountWordlyGoodsObject(e.target)}
              ref='helicoptero' 
              type='checkbox' 
              value='helicóptero' 
            /> Helicóptero
          </label>
          <label>
            <input              
              onChange={(e) => this.mountWordlyGoodsObject(e.target)} 
              ref='mac'
              type='checkbox' 
              value='mac' 
            /> Mac
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
        <h5 className='bold'>
          Filtro simples
        </h5>
        <p>
          Com esta configuração você obterá o valor atual do campo de busca a 
          partir da propriedade onFilter, assim que usuário começa a digitar.          
        </p>
        <Filter
          onFilter={(value) => this.simpleFilter(value)}
          placeholder='Buscar por nome...'
        />
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
