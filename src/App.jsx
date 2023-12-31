import './App.scss';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import SearchResults from './pages/searchResults/SearchResults';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Details from './pages/details/Details';
import Browse from './pages/browse/Browse';

import { fetchDataFromAPI } from './utils/api';
import { setConfiguration } from './store/configurationSlice';
import { useDispatch } from 'react-redux';
import Footer from './components/footer/Footer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getConfigurationData = () => {
      fetchDataFromAPI('/configuration').then((res) => {
        dispatch(setConfiguration(res));
      });
    };
    getConfigurationData();
  });
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/browse/:media_type' element={<Browse />} />
          <Route path='/:media_type/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResults />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
