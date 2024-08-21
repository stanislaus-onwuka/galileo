import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const colorScale = scaleQuantize()
  .domain([1, 10])
  .range(["#FFE5D9", "#FFCABD", "#FFA18D", "#FF7762", "#FF4D37"]);

const CustomerDemographics = () => {
  const data = [
    { id: "USA", value: 8 },
    { id: "AUS", value: 6 },
    { id: "GBR", value: 5 },
    { id: "FRA", value: 4 },
    { id: "DEU", value: 7 },
    // Add more data as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Customer Demographics</h2>
        <div className="text-gray-500">This Week</div>
      </div>
      <ComposableMap projection="geoMercator" width={800} height={400}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryData = data.find(
                (d) => d.id === geo.properties.ISO_A3
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={countryData ? colorScale(countryData.value) : "#F5F5F5"}
                  stroke="#FFF"
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="mt-4 flex justify-between text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#FF4D37] mr-2"></div> United States
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#FFA18D] mr-2"></div> Europe
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#FFCABD] mr-2"></div> Australia
        </div>
      </div>
    </div>
  );
};

export default CustomerDemographics;
