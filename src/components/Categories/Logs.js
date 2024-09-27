import React, { useEffect, useState } from "react";
import axios from "axios";

const Logs = () => {
  const [log, setLogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://privatejetcharters-server-ttz1.onrender.com/api/admin/getalllogs"
        );
        setLogs(response.data.data);
        setLoading(false);
        console.log(response);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-[300px] h-full">
      <table className="w-4/5 mx-auto border border-collapse table-auto border-slate-500">
        <thead>
          <tr>
            <th className="p-2 border border-slate-600">Sl.no</th>
            <th className="p-2 border border-slate-600">Log details</th>
          </tr>
        </thead>
        <tbody>
          {log.map((item, index) => (
            <tr key={index}>
              {/* <td className="p-2 border border-slate-700">{index + 1}</td>
              <td className="p-2 break-words whitespace-normal border border-slate-700">
                {item.log}
              </td> */}
              <td className="p-2 border border-slate-700">{index + 1}</td>
              <td className="p-2 border border-slate-700 w-[300px] break-words whitespace-normal">
                {item.log}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
