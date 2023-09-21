import React, { useEffect, useState } from 'react';

function App() {
  const [isvalidChromeUserAgent, setIsvalidChromeUserAgent] = useState(true);
  const [isUsingProxy, setIsUsingProxy] = useState(false);
  const [isOriginAgentCluster, setIsOriginAgentCluster] = useState(false)

  useEffect(() => {
    const isChromeBrowser = /^Mozilla\/5\.0 \(Windows NT 10\.0(?:; (Win64; x64|WOW64))?\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/(\d+\.\d+\.\d+\.\d+) Safari\/537\.36$/.test(window.navigator.userAgent);
    setIsvalidChromeUserAgent(isChromeBrowser);
    setIsOriginAgentCluster(window.originAgentCluster)
    fetch('http://localhost:5000/is-proxy')
    .then(response => response.text())
    .then(data => {
      if (data !== "Failed to fetch API data") {
        console.log(data)
        setIsUsingProxy(data)
      }
    })
  }, []);
  return (
    <div>
      {!isOriginAgentCluster || !isvalidChromeUserAgent || isUsingProxy ? (
        <p>You May Be Using GoLogin</p>
      ) : (
        <p>You May Be Using Chrome</p>
      )}
    </div>
  );
}

export default App;
