import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Home, Bar, SignIn,Create } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { FirebaseAppProvider, AuthCheck } from 'reactfire'; 
import 'firebase/auth'; 
import { firebaseConfig } from './firebaseConfig' 
import Cart from './components/Cart/Cart'
import { CartItemType } from './App';
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();


ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={client}>

    <FirebaseAppProvider firebaseConfig={firebaseConfig}> 
    <Provider store = { store }>

    <Router>
    <Switch>
            <Route exact path='/'>
              <Home title = {''}/>
            </Route>
            <Route exact path='/Bar'>
              <Bar/>
            </Route>
            <Route exact path='/SignIn'>
              <SignIn/>
            </Route>
            <Route exact path='/create'>
              <Create />
            </Route>
            <Route exact path='/Cart'>
              <Cart cartItems={[]} addToCart={function (clickedItem: CartItemType): void {
                throw new Error('Function not implemented.');
              } } removeFromCart={function (id: number): void {
                throw new Error('Function not implemented.');
              } }/>
            </Route>
            <Route exact path='/App'>
              <App/>
            </Route>

          </Switch>
    </Router>
    </Provider>
    </FirebaseAppProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
