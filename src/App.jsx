import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import BrandsPage from './pages/brandsPage';
import ModelsPage from './pages/modelsPage';
import DetailsPage from './pages/detailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<BrandsPage />} />
          <Route path="/brands/:id" element={<ModelsPage />} />
          <Route path="/guitars/:brandId/:modelId" element={<DetailsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
