import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useLocation, useNavigate } from "react-router-dom";

import { history } from "./helpers/common";
import Routing from "./Routing";

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
