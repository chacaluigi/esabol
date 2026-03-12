import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navConfig } from '@/config/navigation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {navConfig.mainNav.map((route) => (
          <Route
            key={route.href}
            path={route.href}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
