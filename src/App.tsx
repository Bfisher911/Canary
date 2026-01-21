import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Wizard from './pages/Wizard';
import Library from './pages/Library';
import Layout from './components/Layout';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/wizard" element={<Wizard />} />
                    <Route path="/library" element={<Library />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
