import { Fragment } from 'react/jsx-runtime';
import './App.css';
import '../src/components/Cardloader/Loader.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Route from "./Routes/Index";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Route />
    </Fragment>
  );
}

export default App;
