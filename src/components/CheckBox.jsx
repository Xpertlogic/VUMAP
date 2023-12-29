function CheckBox() {
  return (
    <>
      <section>
        <h1>DATA</h1>
        <div className="checkBox-group">
          <ul>
            <li>
              <label>
                <input type="checkbox" />
                POI
              </label>
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    BANK
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    ATM
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default CheckBox;
