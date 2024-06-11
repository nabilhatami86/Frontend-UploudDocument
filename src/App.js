import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import RouterAplication from "./routes";

function App() {
  return (
    <div>
      <BrowserRouter>
     <RouterAplication/>
      </BrowserRouter>
    </div>
  );
}

export default App;
