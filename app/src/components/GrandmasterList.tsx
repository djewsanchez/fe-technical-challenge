import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GrandmasterList = () => {
  const [grandmasters, setGrandmasters] = useState<string[]>([])


  const fetchGrandmasters = async () => {
    try {
      const response = await fetch("https://api.chess.com/pub/titled/GM");
      const data = await response.json();
      setGrandmasters(data["players"]);
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() => {
    fetchGrandmasters();
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <ul className="space-y-2">
        {grandmasters.map((gm) => (
          <li key={gm} className="p-2 border rounded hover:bg-gray-100">
            <Link to={`/${gm}`} className="text-blue-600 hover:underline">
              {gm}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GrandmasterList;