import {Route, Routes} from "react-router-dom"
import Main from "./components/Main/Main.jsx";
import Mac from "./pages/Mac/Mac.jsx";
import Iphone from "./pages/Iphone/Iphone.jsx";
import Ipad from "./pages/Ipad/Ipad.jsx";
import Music from "./pages/Music/Music.jsx";
import Support from "./pages/Support/Support.jsx";
import Tv from "./pages/Tv/Tv.jsx";
import Watch from "./pages/Watch/Watch.jsx";
import Four4 from "./pages/Four4/Four4.jsx";
import ProductPage from "./pages/Productpage/ProductPage.jsx";
import SharedAll from "./pages/SharedAll/Shared.jsx";
import "./style.css";
import "./css/styles.css";
import "./css/bootstrap.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedAll/>}>
        <Route path="/" element={<Main/>} />
        <Route path="mac" element={<Mac/>} />
        <Route path="iphone" element={<Iphone />} />
        <Route path="/product/:category/:id" element={<ProductPage />} />
        <Route path="ipad" element={<Ipad />} />
        
        <Route path="watch" element={<Watch />} />
        <Route path="tv" element={<Tv />} />  
        <Route path="music" element={<Music />} />
        <Route path="support" element={<Support />} />
        <Route path="*" element={<Four4 />} />
          </Route>



      </Routes>
      
      
     
    </>
  )
};
export default App; 

