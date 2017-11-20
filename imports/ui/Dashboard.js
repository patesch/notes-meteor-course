import React from 'react';

import PrivateHeader from './PrivateHeader';

// Stateless Functional Components
export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        Dashboard page content
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
