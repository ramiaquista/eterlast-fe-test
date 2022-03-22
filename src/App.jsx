import Recat from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';

const App = () => {
  return (
    <div className="min-h-screen gradient-bg-welcome" >
      <header>
       <Navbar />
      </header>
      <main className="flex">
        <Home />
      </main>
    </div>
  );
}

export default App;