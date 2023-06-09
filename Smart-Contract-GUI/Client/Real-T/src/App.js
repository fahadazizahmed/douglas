import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import 'antd/dist/antd.css';
import Profile from './containers/Profile';
import Register from './containers/Register';
import ProtectedRoute from './containers/ProtectedRoute';
import Login from './containers/Login';
import PageNotFound from './components/PageNotFound';
import Home from "./containers/Home";
import Main from "./containers/Main";
import Admin from "./containers/Admin";
import Gallery from "./containers/Gallery";
import WithNavBar from "./containers/WithNavBar";
import Listings from "./components/Listings";
import Landlord from "./containers/Landlord";
import Assignment from "./containers/Assignment";
import Cart from "./containers/Cart";
import PersonalGalery from "./containers/PersonalGallery";
import ListingDetails from "./containers/ListingDetails";
import Checkout from "./containers/Checkout";
import Orders from "./components/AdminPanel/Orders";
import ListDocuments from "./containers/ListDocuments";
import EditablePDF from "./containers/EditablePDF";
import EditProperty from "./containers/EditProperty";
import Myproperty from "./containers/Myproperty";
import ListDocumentEdit from "./containers/ListDocumentEdit";
// import Map from "./containers/Map";
import MapComponent from "./containers/MapComponent";


function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/real-t" component={Main} />
          <Route path="/real-t/home" component={Home} />
          <Route path="/real-t/admin" component={Admin} />
          <Route path="/real-t/map" component={MapComponent} />
          <ProtectedRoute path="/real-t/profile" component={Profile} />
          <Route path="/real-t/properties" component={Gallery} />
          <Route path="/real-t/my-properties" component={Myproperty} />
          <Route path="/real-t/listing/:id" component={ListingDetails} />
          <ProtectedRoute path="/real-t/manage" component={WithNavBar(Listings)} />
          <ProtectedRoute path="/real-t/cart" component={Cart} />
          <ProtectedRoute path="/real-t/checkout" component={Checkout} />
          <ProtectedRoute path="/real-t/orders" component={() => <Orders isAdmin={false}/> } />
          <Route exact path="/real-t/register" component={Register} />
          <Route exact path="/real-t/login" component={Login} />
          <Route path="/real-t/aboutus" component={Admin} />
          <Route path="/real-t/contactus" component={Admin} />
          <Route path="/real-t/landlord" component={Landlord} />
          <Route path="/real-t/list-document" component={ListDocuments} />
          <Route path="/real-t/list-document-edit/:id" component={ListDocumentEdit} />
          <Route path="/real-t/add-property" component={EditablePDF} />
          <Route path="/real-t/edit-property/:id" component={EditProperty} />
          <Route path="/real-t/assignments/:id" component={Assignment} />
          <Route path="/real-t/:username" component={PersonalGalery} />

        
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
  );
}

export default App;
