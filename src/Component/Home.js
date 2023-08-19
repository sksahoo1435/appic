import React, { useState } from "react";
import "./home.css";

const Home = ({ tableData }) => {
  const [titleSearch, setTitleSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  const categories = [...new Set(tableData.map((product) => product.category))];

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) =>
      prevOrder === "ascending" ? "descending" : "ascending"
    );
  };

  const filteredProducts = tableData
    .filter((product) =>
      product.title.toLowerCase().includes(titleSearch.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .slice()
    .sort((a, b) => {
      const order = sortOrder === "ascending" ? 1 : -1;
      return order * (a.price - b.price);
    });

  return (
    <div className="mainContainer">
      <div className="btn-sec">
        <input
          type="text"
          placeholder="Search datas by title..."
          value={titleSearch}
          onChange={(e) => setTitleSearch(e.target.value)}
        />

        <button onClick={() => setTitleSearch("")}>Clear</button>

        <div className="btn-sec-2">
          <div className="select-container">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="price-filter">
            <div className="sort-buttons">
              <button
                onClick={toggleSortOrder}
                className={sortOrder === "ascending" ? "active" : ""}
              >
                Ascending Price
              </button>
              <button
                onClick={toggleSortOrder}
                className={sortOrder === "descending" ? "active" : ""}
              >
                Descending Price
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-sec">
        <table width="max-content">
          <thead>
            <tr>
              {Object.keys(filteredProducts[0] || {}).map((key) => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>

          <tbody className="tableDiv">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                {Object.keys(product).map((key) => (
                  <td key={key}>
                    {key === "thumbnail" ? (
                      <img
                        src={product[key]}
                        alt={`${product.title} ${key}`}
                        style={{ width: "50px" }}
                      />
                    ) : key === "images" ? (
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "row",
                          gap: "1vw",
                        }}
                      >
                        {product[key].map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="mulImg"
                            style={{ width: "50px", marginRight: "5px" }}
                          />
                        ))}
                      </div>
                    ) : key === "description" ? (
                      <div
                        style={{
                          width: 180,
                          textAlign: "left",
                        }}
                      >
                        {product[key]}
                      </div>
                    ) : (
                      product[key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
