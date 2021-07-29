import AppLayout from './layouts/AppLayout'
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/store'

const store = ConfigureStore();


function App() {
  return (
    <div>
      <Router >
      <Provider store={store}>
        <AppLayout />
      </Provider>
      </Router >

    </div>
  );
}

export default App;
