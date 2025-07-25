import React, { useEffect, useState } from "react";

function Github() {
  const [data, setdata] = useState({});

  useEffect(() => {
    fetch('https://api.github.com/users/ajaysinghraghav22')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setdata(data);
      })
      .catch(error => {
        console.error("Error fetching GitHub data:", error);
      });
  }, []);

  return (
    <div className="text-center bg-gray-600 text-2xl p-4 m-4 text-white">
      {data.followers ? (
        <>
          Github followers: {data.followers}
          <img src={data.avatar_url} alt="Github Picture" width={200} />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default Github;
