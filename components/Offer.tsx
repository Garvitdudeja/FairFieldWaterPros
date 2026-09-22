import LeadForm from "./LeadForm";

/**
 * The quote block on the Home page. The Contact page has its own, fuller
 * version of this alongside the phone and hours.
 */
export default function Offer() {
  return (
    <section className="section section--canvas" id="request-a-test">
      <div className="container">
        <div className="offer">
          <div>
            <p className="offer__eyebrow">Free water testing</p>
            <h2 className="offer__title">Request a water test</h2>
            <p className="offer__body">
              A technician tests at your tap and goes through the results with you in plain
              language. There is no charge and no obligation to buy anything.
            </p>
            <ul className="offer__list">
              <li>Hardness, iron, pH, sulfur and TDS tested on site</li>
              <li>Lab testing arranged for radon, arsenic and bacteria</li>
              <li>Written pricing before anything is ordered</li>
              <li>Evening and Saturday appointments available</li>
            </ul>
          </div>

          <LeadForm />
        </div>
      </div>
    </section>
  );
}
