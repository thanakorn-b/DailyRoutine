import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const TopBar = styled.div`

`;

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

  const handleOnChangeText = (event: any, memo: any) => { //OK
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
  };

  const AddMemo = () => {
    var dataChange = { 
      "description": ``,
      "pub_date": `${moment().format()}`
      };
    fetch(`${API_HOST}history/historyCreate/`, {
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
      .catch(error => console.log(error));
  };

  const deleteMemo = (memo: any) => {
    fetch(`${API_HOST}history/historyDelete/${memo.id}/`, {
      method: 'DELETE',
      headers:{
        'Content-type':'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        fetch(`${API_HOST}history/`, {
          method: 'GET',
        }).then(response => response.json())
          .then(data => setMemos(data))
      })
      .catch(error => console.log(error))
  };

  return (
    <div >
      <div>Daily Routine</div>
      <body>
        <div>
          <div>date</div>
        </div>
        <div>
          <div>Today</div>
          {memos.map((memo, i) =>
            <div key={i}>
              <input value={memo.description} onChange={e => handleOnChangeText(e, memo)}></input>
              <div>{memo.pub_date}</div>
              {/* <input value={memo.pub_date} onChange={e => handleOnChangeText(e, memo)}></input> */}
              <button onClick={() => deleteMemo(memo)}>X</button>
            </div>
          )}
          <button onClick={AddMemo}>Add</button>
          <button onClick={() => console.log(moment().format())}>CheckTable</button>
        </div>
      </body>
    </div>
  );
}

export default App;
