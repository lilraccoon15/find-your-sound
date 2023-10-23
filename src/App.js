import { store } from "./redux/store";
import { Provider } from "react-redux";
import './css/style.css';
import Layout from "./components/Layout";

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
