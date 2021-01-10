import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Memos {
  id: number;
  description: string;
  pub_date: Date;
};

function App() {
  const API_HOST = 'http://localhost:8000/';
  const [memos, setMemos] = useState<Memos[]>([]);

  useEffect(() => {
    fetch(`${API_HOST}history/`, {
      method: 'GET',
    }).then(response => response.json())
      .then(data => setMemos(data));
  }, []);

  // const addData = () => {
  //   setMemos([...memos,{id: 10, description: "Write something"}])
  // }

  const handleOnChange = (event: any, memo: any) => { //OK
    // for(var i in memos){
    //   if(memos[i].id === memoId) {
    //     memos[i].description = event.target.value;
    //     break;
    //   };
    // }
    // setMemos(memos);  
    var dataChange = { 
      "description": `${event.target.value}`,
      "pub_date": `${memo.pub_date}` 
      };
    fetch(`${API_HOST}history/historyUpdate/${memo.id}/`, {
      method: 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(dataChange)
    })
      .then(response => response.json())
      .then(data => {
        fetch(`${API_HOST}history/`, {
          method: 'GET',

        }).then(response => response.json())
          .then(data => setMemos(data))
      })
      .catch(error => console.log(error))
      console.log(dataChange)
  };

  const TopBar = styled.div`

  `;

  return (
    <div >
      <TopBar>Daily Routine</TopBar>
      <body>
        <div>
          <div>date</div>
        </div>
        <div>
          <div>Today</div>
          {memos.map((memo, i) =>
            <div key={i}>
              <input value={memo.description} onChange={e => handleOnChange(e, memo)}></input>
              <div>{memo.pub_date}</div>
            </div>
          )}
          <button onClick={() => console.log(memos)}>Add</button>
        </div>
      </body>
    </div>
  );
}

export default App;
