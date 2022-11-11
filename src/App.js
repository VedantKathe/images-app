import Gallery from "../src/components/Gallery"
import ImageDetails from "../src/components/ImageDetails"
import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';

export const config = {
  endpoint: `https://api.unsplash.com/photos`
};

function App() {
  return (
    <React.StrictMode>
      <Switch>
        <Route exact path="/">
          <Gallery />
        </Route>
        <Route path="/image/:id">
          <ImageDetails />
        </Route>
      </Switch >
    </React.StrictMode >
  );
}

export default App;
