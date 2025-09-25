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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">GM List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {grandmasters.map((gm) => (
          <li
            key={gm}
            className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition flex items-center"
          >
            <Link
              to={`/${gm}`}
              className="text-blue-600 hover:underline font-medium truncate"
            >
              {gm}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GrandmasterList;