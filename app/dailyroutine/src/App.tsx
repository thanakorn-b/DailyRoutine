import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';

const TopBar = styled.div`
  background-color: lightblue;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TopBarFont = styled.div`
  font-size: 24px;
`;

interface Memos {
  id: number;
  description: string;
  date: string;
  time: string;
  pub_date: Date;
};

function App() {
  const API_HOST = 'http://localhost:8000/';
  const [memos, setMemos] = useState<Memos[]>([]);
  const [time, setTime] = useState<Date | null>(new Date())


  useEffect(() => {
    fetch(`${API_HOST}history/`, {
      method: 'GET',
    }).then(response => response.json())
      .then(data => setMemos(data));
  }, []);

  const handleOnChangeText = (event: any, memo: any) => { //OK
    var dataChange = {
      "description": `${event.target.value}`
    };
    fetch(`${API_HOST}history/historyUpdate/${memo.id}/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
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
      "date": `${moment().format('M-D')}`,
      "time": `${moment().format('H:m')}`,
      "pub_date": `${moment().format()}`
    };
    fetch(`${API_HOST}history/historyCreate/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
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
      headers: {
        'Content-type': 'application/json',
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

  const handleOnChangeDate = (event: any, memo: any) => {
    var dataChange = {
      "date": `${event.target.value}`
    };
    fetch(`${API_HOST}history/historyUpdate/${memo.id}/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataChange)
    })
      .then(response => response.json())
      .then(data => {
        // fetch(`${API_HOST}history/`, {
        //   method: 'GET',

        // }).then(response => response.json())
        // .then(data => setMemos(data))
      })
      .catch(error => console.log(error))
  };

  const handleOnChangeTime = (event: any, memo: any) => {
    var dataChange = {
      "time": `${event.target.value}`
    };
    fetch(`${API_HOST}history/historyUpdate/${memo.id}/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
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
  }

  const updateData = () => {
    fetch(`${API_HOST}history/`, {
      method: 'GET',

    }).then(response => response.json())
      .then(data => setMemos(data))
  }

  return (
    <div >
      <TopBar>
        <TopBarFont>Daily Routine</TopBarFont>
      </TopBar>
      <body>
        <div>
          <div>History</div>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            {/* <TimePicker
              value="07:30"
              onChange={setTime}
            /> */}
            {/* <DatePicker 
            value={time} 
            onChange={setTime} 
          />*/}
          </MuiPickersUtilsProvider>
          {memos.map((memo, i) =>
            <div key={i}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  value={memo.pub_date}
                  onChange={setTime}
                />
              </MuiPickersUtilsProvider>
              {/* <input value={memo.date} onChange={e => handleOnChangeDate(e, memo)}></input>
              <input value={memo.time} onChange={e => handleOnChangeTime(e, memo)}></input> */}
              <input value={memo.description} onChange={e => handleOnChangeText(e, memo)}></input>
              {/* <input value={memo.pub_date} onChange={e => handleOnChangeText(e, memo)}></input> */}
              <button onClick={() => deleteMemo(memo)}>X</button>
            </div>
          )}
          <button onClick={AddMemo}>Add</button>
          <button onClick={() => console.log(time)}>CheckTable</button>
        </div>
      </body>
    </div>
  );
}

export default App;
