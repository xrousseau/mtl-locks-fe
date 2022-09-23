import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';
import { Info } from './Info';
import * as utility from './utility';


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


      const style = utility.getStyle(status);
      return (
        <div>
          <div style={{ maxWidth: '100vh', maxHeight: '100vh'  }}>
            <CircularProgressbarWithChildren 
              value={status.openedMinutesRemaining} 
              maxValue={60} 
              strokeWidth={10}
              styles={
                buildStyles({
                  pathColor: style.color
                })
              }
            >
            <Info value={status} style={style} />
            </CircularProgressbarWithChildren>;
          </div>
        </div>
      );
  }
}



export default App;