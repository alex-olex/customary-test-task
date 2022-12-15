import { Home, Login, Table } from './pages'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projects/:projectId" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/table/:id" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;
