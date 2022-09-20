import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';


const App = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [status, setItems] = useState([]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);

  }, [])

  const fetchData = () => {
    fetch("https://bridge-status.azurewebsites.net/api/GetBridgeStatus?id=M1")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  };


  if (error) {
    return <div>Error : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

      return (
        <div style={{ width: '100vw', height: '100vh'  }}>
          <CircularProgressbar value={status.openedMinutesRemaining} maxValue={60} text={`${status.openedMinutesRemaining} m`} />;
        </div>
      );
  }

}

export default App;