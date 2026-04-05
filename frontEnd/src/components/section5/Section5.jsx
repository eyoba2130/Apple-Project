import appleTv from "../../assets/navbar image/apple-tv-logo.png"
import servantLogo from "../../assets/navbar image/servant-logo.png"
export default function Section5() {
    return (
         <section className="smart-tech">
        <div className="logo">
            <div className="tv">
                <img src={appleTv} alt="apple-tv-" className="apple-tv" />
                <br />
                <img src={servantLogo} alt="servant-logo" className="servant-logo" />

                <p>Watch the trailer</p>
            </div>
        </div>
        <div className="airpad">
            <h2>airPods Pro</h2>
            <h6>Magic like you’ve never heard.
            </h6>
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