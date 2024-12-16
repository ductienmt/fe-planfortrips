import { width } from "@mui/system";
import React, { useState, useEffect } from "react";

const SvgIcon = ({ url }) => {
  const [svgContent, setSvgContent] = useState(null);
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        setSvgContent(response.url);
      } catch (error) {
        console.error("Error fetching SVG:", error);
      }
    };
    fetchSvg();
  }, [url]);

  return <img style={{ width:'20px',height:'20px' }} src={url} alt={url}/>;
};

export default SvgIcon;
