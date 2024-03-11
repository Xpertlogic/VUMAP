const items = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, eveniet!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, eveniet!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, eveniet! Lorem ipsum dolor sit.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, eveniet! Lorem ipsum dolor sit.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, eveniet! Lorem ipsum dolor sit.",
];

const UpdateBox = () => {
  return (
    <section className="update-section slideRightToLeftAnimation">
      <h1>NEWS & UPDATES</h1>
      <ul className="update-box">
        {items.map((item, index) => (
          <li key={index} className="update-item">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UpdateBox;
