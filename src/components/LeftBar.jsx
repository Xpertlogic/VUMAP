// import React, { useEffect, useState } from "react";
// import { Select, Space } from "antd";
// import indiadata from "../data/indiaData.json";
// import cities from "../data/cities.json";

// function LeftBar() {
//   const [stateName, setStateName] = useState([]);
//   const [cityName, setCityName] = useState([]);
//   const [centerPosition, setCenetrPosition] = useState([]);

//   // console.log(cities);
//   const changeState = (value) => {
//     setStateName(value);
//     // console.log(e);

//     const getCooridinate = indiadata.find((item) => item.state === value);
//     setCenetrPosition(getCooridinate);
//   };

//   const getCities = cities.filter((item) => item.state === stateName);
//   console.log(getCities);

//   // useEffect(() => {
//   //   setStateName(indiadata);
//   // }, []);

//   return (
//     <div className="bg-yellow-300">
//       <Space wrap className="m-2">
//         <label htmlFor="">State :</label>
//         <Select className="w-[200px]" onChange={(e) => changeState(e)}>
//           {/* <option value="0">Select state</option> */}
//           {indiadata && indiadata !== undefined
//             ? indiadata.map((stateItem, index) => {
//                 return (
//                   <option value={stateItem.state} key={index}>
//                     {stateItem.state}
//                   </option>
//                 );
//               })
//             : "No State"}
//         </Select>
//         <label htmlFor="">City :</label>
//         <select className="w-[200px]">
//           <option value="0">Select City</option>
//           {getCities && getCities !== undefined
//             ? getCities.map((stateItem, index) => {
//                 return (
//                   <option value={stateItem.name} key={index}>
//                     {stateItem.name}
//                   </option>
//                 );
//               })
//             : "No State"}
//         </select>
//       </Space>
//     </div>
//   );
// }
// export default LeftBar;
