import LeadForm from "./LeadForm";

export default function Offer() {
  return (
    <section className="section section--white" id="free-water-test">
      <div className="container">
        <div className="offer">
          <div>
            <p className="offer__eyebrow">No charge, no obligation</p>
            <h2 className="offer__title">Find out what&rsquo;s actually in your water</h2>
            <p className="offer__body">
              A technician tests at your tap and walks you through the results in plain
              language — whether or not you buy anything.
            </p>
            <ul className="offer__list">
              <li>Results explained on the spot</li>
              <li>Written pricing before anything is ordered</li>
              <li>Evening and Saturday slots available</li>
            </ul>
          </div>

          <LeadForm />
        </div>
      </div>
    </section>
  );
}
