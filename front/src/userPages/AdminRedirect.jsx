import React, { useEffect } from "react";

const AdminRedirect = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 👇️ Redirect to Django's Admin Page (http://localhost:8000/admin)
	  let protocol = "";
	  if (window.location.href.indexOf('http://')==0) {
	  	protocol = "http://";
	  } else if (window.location.href.indexOf('https://')==0) {
		protocol = "https://";
	  }
	  window.location.replace(protocol+window.location.hostname+":8000"+"/admin");
    }, 3000);  // 3000 ms delay

    return () => clearTimeout(timeout);
  }, []);

  return (<div>Redirecting to Admin Page...</div>);
};

/*const AdminRedirect = () => {
  useEffect(() => {
    const currentURL = window.location.href;
    // 👇️ Redirect to Django's Admin Page (http://localhost:8000/admin)
    const newPort = 8000;
    const newURL = currentURL.replace(/(http(s)?:\/\/[^/:]+)(:\d+)?/, `$1:${newPort}`);
    window.location.replace(newURL);
  }, []);
  
  return (<div>Redirecting to Admin Page...</div>);
};*/


export default AdminRedirect;
