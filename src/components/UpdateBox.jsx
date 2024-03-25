const items = [
  "Download India Administrative Boundary Shapefiles",
  "Download States Administrative Boundary Shapefiles",
  "Download Districts Boundary Shapefiles",
  "Download Pincodes Boundary Shapefiles",
  "Download Tahasil Boundary Shapefiles",
  "Download Village Boundary Shapefiles",
  "Download Parliament Boundary Shapefiles.",
  "Download Assembly Boundary Shapefiles",
  "Download Constituency Boundaries Shapefiles",
  "Download Rail line Shapefiles",
  "Download Railway Platform Shapefiles",
  "Download All Indian Airports name list",
  "Download All Indian Airports Shapefiles",
  "Download Road Shapefiles",
  "Download toll booth / Toll Gate / Toll plaza Shapefiles",
  "Download toll booth / Toll Gate / Toll plaza information",
  "Download tunnel Shapefiles",
  "Download Bridges Shapefiles",
  "Download Flyover Shapefiles",
  "Download Roads Signs",
  "Download Buildings Shapefiles",
  "POI (Restaurants, Cafes, Fast food outlets, Fine dining establishments, Bars, Pubs, Nightclubs, Hotels, Motels, Bed and Breakfasts (B&Bs), Resorts, Hostels, Tourist Attractions, Landmarks, Monuments, Museums, Art galleries, Historical sites, National parks, Zoos, Aquariums, Botanical gardens, Theme parks, Amusement parks, Wildlife reserves, Gas Stations, Convenience stores, Car washes, Repair shops, Parks and Recreation Areas, Public parks, Gardens, Hiking trails, Beaches, Picnic area, Sports fields/courts, Hospitals, Clinics, Pharmacies, Urgent care centers, Emergency rooms, Police Stations, Fire Stations, Ambulance Services, Shopping Centers, Malls, Department stores, Grocery stores, Markets, Outlet centers, Educational Institutions, Schools, Colleges, Universities, Libraries, Research centers, Transportation Hubs, Airports, Train stations, Bus terminals, Ferry docks, Subway stations, Sports Venues, Stadiums, Arenas, Gyms, Sports complexes, Golf courses, Tennis courts, Cultural Centers, Theaters, Concert halls, Cinemas, Community centers, Performing arts centers, Religious Sites, Churches, Mosques, Temples, Synagogues, Shrines, Cemeteries, Memorials, Observation Decks, Viewing platforms, Lighthouses, Towers, Bridges, Castles, Palaces, Forts, Archaeological sites, Waterfalls, Volcanoes, Mountains, Lakes, Rivers, Canyons, Valleys, Islands).",
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
