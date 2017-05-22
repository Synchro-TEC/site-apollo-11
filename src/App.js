import React from 'react';
import { Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { Router } from 'react-router';
import TemplateDocs from './pages/TemplateDocs';
import HomePage from './pages/home/Home';
import InstallPage from './pages/install/InstallPage';
import DocsHomePage from './pages/docsHome/DocsHome';
import HermesPage from './pages/hermes/HermesPage';
import LaunchWindowPage from './pages/launchWindow/launchWindowPage';
import FilterPage from './pages/filter/filterPage';
import DataTablePage from './pages/dataTable/dataTablePage';
import PaginatePage from './pages/paginate/paginatePage';
import PowerTablePage from './pages/PowerTable/PowerTablePage';
import UserTestsPage from './pages/userTests/userTestsPage';
import PowerSheetPage from './pages/PowerSheet/PowerSheetPage';

const hashHistory = createHashHistory();

const App = () => (
  <Router history={hashHistory}>
    <TemplateDocs>
      <Route component={HomePage} exact path='/' />
      <Route component={InstallPage} exact path='/install' />
      <Route component={DocsHomePage} exact path='/docs' />
      <Route component={HermesPage} exact path='/hermes' />
      <Route component={LaunchWindowPage} exact path='/launch-window' />
      <Route component={FilterPage} exact path='/filter' />
      <Route component={DataTablePage} exact path='/data-table' />
      <Route component={PaginatePage} exact path='/paginate' />
      <Route component={PowerTablePage} exact path='/power-table' />
      <Route component={UserTestsPage} exact path='/user-tests' />
      <Route component={PowerSheetPage} exact path='/power-sheet' />
    </TemplateDocs>
  </Router>
);

App.displayName = 'App';
export default App;
