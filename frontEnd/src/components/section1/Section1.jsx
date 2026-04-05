import macbookpro from "../../assets/mac image/macbook-pro.jpg";
// import "../../css/apple.css";
export default function Section1() {
    return (
        <section id="mac" className="macbook">
        <p>16-inch model
        </p>
        <h1>MacBook Pro</h1>
        <p>The best for the brightest.</p>
        <ul>
            <li><a href="#">Learn more </a>
                <input type="radio"/>
            </li>
            <li><a href="#"> Buy</a><input type="radio"/></li>
        </ul>
        <div className="macimage">
                <img src={macbookpro } />
        </div>
    </section>
    )
}