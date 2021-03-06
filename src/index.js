import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/SpoqaHanSansNeo/SpoqaHanSans.css';
import './fonts/NotoSansCJKkr/NotoSansCJKkr.css';
import './fonts/NanumSquare/nanumsquare.css';

import { Provider } from 'react-redux';
import { store } from './redux/helper';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
