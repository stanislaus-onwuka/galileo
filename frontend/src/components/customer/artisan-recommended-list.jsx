/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getRandomColor } from "../../../utils/functions";
import ArtisanLink from "./artisan-link";

function ArtisanRecommendedList({ data }) {
    const [artisanColors, setArtisanColors] = useState({});

    console.log(artisanColors)
	useEffect(() => {
        const colors = {};
        
		data.forEach((_artisan, idx) => {
			colors[idx + 1] = getRandomColor();
        });
        
		setArtisanColors(colors);
    }, [data]);
    
	return (
		<div className="grid grid-cols-recommendation-grid">
			{data.map((artisan, idx) => {
				return <ArtisanLink key={idx + 1} containerBg={artisanColors[idx+1]} data={artisan}/>;
			})}
		</div>
	);
}

export default ArtisanRecommendedList;
