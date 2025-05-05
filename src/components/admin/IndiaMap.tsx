
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from '@/components/ui/tooltip';
import { 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

// Using a different, more reliable GeoJSON source for Indian states
const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";

// Hardcoded data for state-wise voting
const STATE_DATA = [
  { id: "AP", state: "Andhra Pradesh", votes: 78452, percentage: 14.2 },
  { id: "AR", state: "Arunachal Pradesh", votes: 12564, percentage: 2.3 },
  { id: "AS", state: "Assam", votes: 42789, percentage: 7.7 },
  { id: "BR", state: "Bihar", votes: 124563, percentage: 22.5 },
  { id: "CT", state: "Chhattisgarh", votes: 37895, percentage: 6.8 },
  { id: "GA", state: "Goa", votes: 9823, percentage: 1.8 },
  { id: "GJ", state: "Gujarat", votes: 86421, percentage: 15.6 },
  { id: "HR", state: "Haryana", votes: 43278, percentage: 7.8 },
  { id: "HP", state: "Himachal Pradesh", votes: 18923, percentage: 3.4 },
  { id: "JK", state: "Jammu and Kashmir", votes: 21456, percentage: 3.9 },
  { id: "JH", state: "Jharkhand", votes: 39874, percentage: 7.2 },
  { id: "KA", state: "Karnataka", votes: 92341, percentage: 16.7 },
  { id: "KL", state: "Kerala", votes: 67834, percentage: 12.3 },
  { id: "MP", state: "Madhya Pradesh", votes: 89674, percentage: 16.2 },
  { id: "MH", state: "Maharashtra", votes: 158943, percentage: 28.7 },
  { id: "MN", state: "Manipur", votes: 8945, percentage: 1.6 },
  { id: "ML", state: "Meghalaya", votes: 7856, percentage: 1.4 },
  { id: "MZ", state: "Mizoram", votes: 6234, percentage: 1.1 },
  { id: "NL", state: "Nagaland", votes: 5678, percentage: 1.0 },
  { id: "OR", state: "Odisha", votes: 56432, percentage: 10.2 },
  { id: "PB", state: "Punjab", votes: 43256, percentage: 7.8 },
  { id: "RJ", state: "Rajasthan", votes: 78965, percentage: 14.3 },
  { id: "SK", state: "Sikkim", votes: 4321, percentage: 0.8 },
  { id: "TN", state: "Tamil Nadu", votes: 112543, percentage: 20.3 },
  { id: "TG", state: "Telangana", votes: 54321, percentage: 9.8 },
  { id: "TR", state: "Tripura", votes: 7654, percentage: 1.4 },
  { id: "UT", state: "Uttarakhand", votes: 19872, percentage: 3.6 },
  { id: "UP", state: "Uttar Pradesh", votes: 245678, percentage: 44.4 },
  { id: "WB", state: "West Bengal", votes: 143256, percentage: 25.9 },
  { id: "AN", state: "Andaman and Nicobar Islands", votes: 2345, percentage: 0.4 },
  { id: "CH", state: "Chandigarh", votes: 3456, percentage: 0.6 },
  { id: "DN", state: "Dadra and Nagar Haveli", votes: 1234, percentage: 0.2 },
  { id: "DD", state: "Daman and Diu", votes: 987, percentage: 0.2 },
  { id: "DL", state: "Delhi", votes: 45678, percentage: 8.2 },
  { id: "LD", state: "Lakshadweep", votes: 567, percentage: 0.1 },
  { id: "PY", state: "Puducherry", votes: 3421, percentage: 0.6 }
];

interface TooltipData {
  name: string;
  votes: string;
  percentage: number;
}

const IndiaMap = () => {
  const [tooltipContent, setTooltipContent] = useState<TooltipData | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const onStateClick = (geo: any) => {
    // For GeoJSON we'll check for the name property instead of state_code
    const stateName = geo.properties.name;
    const stateData = STATE_DATA.find(s => s.state === stateName);
    
    if (stateData) {
      setSelectedState(stateData.id);
    }
  };

  const onStateHover = (geo: any) => {
    // For GeoJSON we'll check for the name property instead of state_code
    const stateName = geo.properties.name;
    const stateData = STATE_DATA.find(s => s.state === stateName);
    
    if (stateData) {
      setTooltipContent({
        name: stateData.state,
        votes: stateData.votes.toLocaleString(),
        percentage: stateData.percentage
      });
      setHoveredState(stateName);
    }
  };
  
  const onStateLeave = () => {
    setHoveredState(null);
    setTooltipContent(null);
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/3">
        <div className="w-full aspect-[4/3] relative">
          <TooltipProvider>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 1000,
                center: [78.9629, 22.5937]
              }}
              style={{
                width: "100%",
                height: "100%"
              }}
            >
              <Geographies geography={INDIA_TOPO_JSON}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const stateName = geo.properties.name;
                    const stateData = STATE_DATA.find(s => s.state === stateName);
                    const stateId = stateData?.id;
                    const isHovered = hoveredState === stateName;
                    
                    return (
                      <Tooltip key={geo.rsmKey} open={isHovered}>
                        <TooltipTrigger asChild>
                          <Geography
                            geography={geo}
                            onMouseEnter={() => onStateHover(geo)}
                            onMouseLeave={onStateLeave}
                            onClick={() => onStateClick(geo)}
                            style={{
                              default: {
                                fill: "transparent",
                                stroke: selectedState === stateId ? "#FFFFFF" : "#9F7AEA",
                                strokeWidth: selectedState === stateId ? 2 : 1,
                                outline: "none"
                              },
                              hover: {
                                fill: "#2D1B69",
                                stroke: "#FFFFFF",
                                strokeWidth: 1.5,
                                outline: "none",
                                cursor: "pointer"
                              }
                            }}
                          />
                        </TooltipTrigger>
                        {tooltipContent && isHovered && (
                          <TooltipContent className="bg-[#15121E] border border-[#2D1B69] text-white">
                            <div className="p-2">
                              <p className="font-bold text-[#9F7AEA]">{tooltipContent.name}</p>
                              <p>Votes: {tooltipContent.votes}</p>
                              <p>Turnout: {tooltipContent.percentage}%</p>
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </TooltipProvider>
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <div className="bg-[#0D0D0D] border border-[#6D28D9]/30 rounded-lg p-4 h-full">
          <h3 className="text-lg font-semibold text-[#9F7AEA] mb-4">Vote Distribution</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {STATE_DATA.sort((a, b) => b.votes - a.votes).map((state) => (
              <div 
                key={state.id} 
                className={`p-3 rounded-lg transition-all cursor-pointer ${
                  selectedState === state.id 
                    ? 'bg-[#2D1B69]/70 border border-[#6D28D9]' 
                    : 'bg-[#15121E] hover:bg-[#2D1B69]/40'
                }`}
                onClick={() => setSelectedState(state.id)}
                onMouseEnter={() => {
                  setHoveredState(state.state);
                  setTooltipContent({
                    name: state.state,
                    votes: state.votes.toLocaleString(),
                    percentage: state.percentage
                  });
                }}
                onMouseLeave={() => {
                  setHoveredState(null);
                  setTooltipContent(null);
                }}
              >
                <div className="flex justify-between">
                  <span className="font-medium text-white">{state.state}</span>
                  <span className="text-[#9F7AEA]">{state.percentage}%</span>
                </div>
                <div className="mt-2 w-full bg-[#0D0D0D] h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#6D28D9]" 
                    style={{ width: `${state.percentage * 2}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  {state.votes.toLocaleString()} votes
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
