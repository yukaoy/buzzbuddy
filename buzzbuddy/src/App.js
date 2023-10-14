import React from "react";
// import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing";
// import Main from "./pages/Main";
// import Profile from "./pages/Profile";

function App() {
  console.log("loading app");
  return (
    // <Router>
    //   <Routes>
    //     <Route exact path="/">
    //       <Landing />
    //     </Route>
    //     <Route path="/main">
    //       <Main />
    //     </Route>
    //     <Route path="/profile">
    //       <Profile />
    //     </Route>
    //   </Routes>
    // </Router>
    <Landing/>
  );
}

export default App;
