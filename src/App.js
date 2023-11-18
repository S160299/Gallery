import React, { useState } from "react";
import axios from "axios";
import { Input, Button,Image } from "antd";

const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${search}&per_page=48&format=json&nojsoncallback=1`
      )
      .then((response) => setData(response.data.photos.photo));
  };

  return (
    <>
      {data.length === 0 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <div>
            <center>
              <h1>Gallery Snapshots</h1><br />
              <form onSubmit={submitHandler}>
                <Input
                  style={{ width: 350 }}
                  type="text"
                  placeholder="Search to show Images"
                  value={search}
                  onChange={changeHandler}
                />
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </form>
            </center>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="pt-3">
          <center>
            <h2>Gallery Snapshots</h2><br />
            <form onSubmit={submitHandler}>
              <Input
                style={{ width: 350 }}
                type="text"
                placeholder="Search to show Images"
                value={search}
                onChange={changeHandler}
              />
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </form>
          </center>
          <br />
          <div className="container">
            <div className="row">
              {data.map((image) => (
                <div key={image.id} className="col-md-3 mb-4">
                  <div>
                    <Image
                    style={{borderRadius: "10px"}}
                      src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
                      alt=""
                      height={250}
                      width={300}
                      preview={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
