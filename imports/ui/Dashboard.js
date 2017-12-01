import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteListHeader from './NoteListHeader';
import NoteList from './NoteList';

// Stateless Functional Components
export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        <NoteListHeader/>
        <NoteList/>
      </div>
    </div>
  );
}

// Container Components
// export default class Dashboard extends React.Component {
//   render () {
//     return (
//       <div>
//         <PrivateHeader title="My Title"/>
//       </div>
//     );
//   }
// };
