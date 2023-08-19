import React, { useEffect, useState } from "react";
import Home from "./Home";

const Products = () => {
  const [datas, setDatas] = useState([]);

  const fetchDatasFromAPI = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products`, {
        method: "GET",
      });

      if (response.status === 200) {
        const result = await response.json();

        setDatas(result.products);
      } else {
        console.log("not success response", response);
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  useEffect(() => {
    fetchDatasFromAPI();
  }, []);

  return (
    <div>
      <Home tableData={datas} />
    </div>
  );
};

export default Products;
