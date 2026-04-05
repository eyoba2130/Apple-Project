import mackbook from "../../assets/mac image/macbook-pro.jpg"
import newIpad  from "../../assets/navbar image/new-ipad-logo.png"
export default function Section6() {
    return (
         <section className="ipads">
        <div className="mack">
            <p>16-inch model</p>
            <h1>MacBook Pro</h1>
            <p>The best for the brightest.</p>
            <a href="#">Learn more </a>
            <input type="radio"/>
            <a href="#"> Buy</a><input type="radio"/>
            <div className="macimage">
           <img src={mackbook } className="macbook-pro" />
            </div>
        </div>
        <div className="ipad-pro">
            <div className="new-ipad">
                <img src={newIpad} alt="new-ipad" />
            </div>
            <p>Like a computer. Unlike any computer.</p>
            <div className="a">
                <li>
                    <a href="#">Learn more</a>
                </li>
                <li>
                    <a href="#">Buy</a>
                </li>
            </div>


        </div>

    </section>
   
    )
}