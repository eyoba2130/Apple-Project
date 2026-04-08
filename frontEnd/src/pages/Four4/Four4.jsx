

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Four4() {
  const [products, setProducts] = useState([]);



  console.log(products);
  let order = 1;
  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <div className="title-wraper bold">404</div>
              <div className="brief-description">
                 <h2>
            Not Found</h2>
              </div>
            </div>
          </div>
         
          
        </div>
      </section>
    </div>
  );
}
