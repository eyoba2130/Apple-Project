import applecardimg from "../../assets/navbar image/apple-card-logo.png";
import watchseries5 from "../../assets/navbar image/apple-card-logo.png"

export default function Section4(){
    return (
        <>
          <section className="watch">
        <div className="watch-series">
            <div className="watch-series-5">
                        <img src={watchseries5} />
                <p>With the new always-On Retina display.</p>
                <p>You’ve never seen a watch like this.</p>
                <ul>
                    <li>
                        <a href="#">Learn more</a>
                    </li>
                    <li>
                        <a href="#">Buy</a>
                    </li>
                </ul>

            </div>
        </div>
      
    <div className="apple-card">
                <img src= {applecardimg} />
        <p>Get 3% Daily Cash on purchases from apple using apple Card.</p>
        <ul>
            <li>
                <a href="#">Learn More</a>
            </li>
            <li>
                <a href="#">Buy</a>
            </li>
        </ul>
    </div>

    </section>   
        </> 
    )}