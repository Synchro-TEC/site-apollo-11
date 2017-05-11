import React from 'react';

const DocsHomePage = (props) => {
  return (
    <div className='dm-content'>
      <h4 className='sv-title'>Documentation</h4>
      <p>
        We are working hard to improve and cover all Apollo-11 features, but
        this is a <b>Working In Progress</b> job.
      </p>
      <h5> Bugs and feature requests </h5>
      <p>
        Have a bug or a feature request? Use
        <a href='https://github.com/Synchro-TEC/apollo-11/issues' target='_blank'> Github issues!</a>
      </p>
    </div>
  );
};

DocsHomePage.displayName = 'DocsHomePage';
export default DocsHomePage;
