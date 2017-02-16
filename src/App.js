import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Template from './pages/Template';
import TemplateDocs from './pages/TemplateDocs';

import HomePage from './pages/home/Home';
import InstallPage from './pages/install/InstallPage';
import DocsHomePage from './pages/docsHome/DocsHome';
import HermesPage from './pages/hermes/HermesPage';
import LaunchWindowPage from './pages/launchWindow/launchWindowPage';
import FilterPage from './pages/filter/filterPage';
import DataTablePage from './pages/dataTable/dataTablePage';
import PaginatePage from './pages/paginate/paginatePage';

const App = () => (
  <Router history={hashHistory}>
    <Route component={Template} path='/'>
      <IndexRoute component={HomePage} />
      <Route component={InstallPage} path='/install' />
    </Route>

    <Route component={TemplateDocs} path='/docs'>
      <IndexRoute component={DocsHomePage} />
      <Route component={HermesPage} path='hermes' />
      <Route component={LaunchWindowPage} path='launch-window' />
      <Route component={FilterPage} path='filter' />
      <Route component={DataTablePage} path='data-table' />
      <Route component={PaginatePage} path='paginate' />
    </Route>
  </Router>
);

App.displayName = 'App';

export default App;
