import React, { useState, useEffect } from "react";

const SvgIcon = ({ url, width = 20, height = 20 }) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setSvgContent(text);
      } catch (error) {
        console.error("Error fetching SVG:", error);
      }
    };
    fetchSvg();
  }, [url]);

  return (
    <div
      style={{ width, height }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SvgIcon;
