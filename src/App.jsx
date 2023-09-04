import Mainpage from "./components/main/Mainpage";
import Footer from "./components/navbar/Footer";
import Navbar from "./components/navbar/Navbar";


function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Mainpage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
