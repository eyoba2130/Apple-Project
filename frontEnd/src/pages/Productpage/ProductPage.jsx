import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products/iphone")
      .then((res) => res.json())
      .then((data) => {
        const found = data.products.find((p) => p.product_url === id);
        setProduct(found || null);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="container top-100 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <div className="title-wraper bold">{product.product_name}</div>
              <div className="brief-description">{product.product_brief_description}</div>
            </div>
          </div>

          <div className="row justify-content-center text-center top-100">
            <div className="col-sm-12 col-md-6 my-auto">
              <div className="product-title">{product.product_name}</div>
              <div className="product-brief">{product.product_brief_description}</div>
              <div className="starting-price">Starting at {product.starting_price}</div>
              <div className="monthly-price">{product.price_range}</div>
              <div className="links-wrapper">
                <ul>
                  <li>
                    <a href="#">Buy</a>
                  </li>
                  <li>
                    <Link to="/iphone">Back to iPhones</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="prodict-image">
                <img src={product.product_img} alt={product.product_name} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
