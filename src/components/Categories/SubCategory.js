import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChCard from "../cards/ChCard";

const SubCategory = () => {
  const { charterType } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/admin/filter/${charterType}`);
        setSubCategories(response.data.sortedData);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [charterType]);

  return (
    <div>
      <h1>Subcategories for {charterType}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-4 m-2">
          {subCategories.map((subCategory) => (
            <ChCard
              key={subCategory._id}
              logo={subCategory.image}
              name={subCategory.name}
              description={subCategory.description}
              // Add necessary props and handlers here
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategory;
