import { useState, useEffect } from "react";

export default function Bitcoin({
  onBitcoinChange,
}: {
  onBitcoinChange: (price: number) => void;
}) {
  const PROXY = "https://cors-anywhere.herokuapp.com/";
  const URL = `${PROXY}https://cryptorates.ai/v1/get/BTC`;
  const [localPrice, setLocalPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        if (data.price) {
          onBitcoinChange(data.price); // Sending fetched price to parent
          setLocalPrice(data.price); // Storing price locally
        } else {
          console.error("Invalid data from API");
        }
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
      }
    };

    fetchData();
  }); // Added dependency to prevent unnecessary re-renders

  return (
    <div className="bitcoin" style={{ margin: "0.5rem" }}>
      <label>
        <span style={{ fontWeight: "600", color: "#5A5A5A" }}>Bitcoin:</span>{" "}
        {localPrice}{" "}
      </label>
    </div>
  );
}
