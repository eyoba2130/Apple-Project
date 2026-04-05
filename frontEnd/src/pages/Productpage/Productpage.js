import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Productpage() {
  const [products, setProducts] = useState([]);
  const { pid } = useParams(); // replaces props.match.params.pid

  useEffect(() => {
    fetch("/iphones.json")
      .then((res) => res.json())
      .then((data) => {
        const productList = data.products;
        const singleProduct = productList.filter(
          (x) => x.product_url === pid
        );
        setProducts(singleProduct);
      });
  }, [pid]); // re-run if pid changes

  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          {products.map((product) => {
            const id = product.product_url;
            const title = product.product_name;
            const img = product.product_img;
            const Brief = product.product_brief_description;
            const StartPrice = product.starting_price;
            const PriceRange = product.price_range;
            const details = product.product_description;

            return (
              <div key={id} className="bottom-100">
                <div className="row justify-content-center text-center bottom-50">
                  <div className="col-12">
                    <div className="title-wraper bold">{title}</div>
                    <div className="brief-description">{Brief}</div>
                  </div>
                </div>

                <div className="row justify-content-center text-center product-holder h-100">
                  <div className="col-sm-12 col-md-6 my-auto">
                    <div className="starting-price">
                      {`Starting at ${StartPrice}`}
                    </div>
                    <div className="monthly-price">{PriceRange}</div>
                    <div className="product-details">{details}</div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="prodict-image">
                      <img src={img} alt={title} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Productpage;