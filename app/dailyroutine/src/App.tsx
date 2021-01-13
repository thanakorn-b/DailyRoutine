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
  background-color: grey;
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopBarFont = styled.div`
  font-size: 24px;
`;

const Body = styled.div`
  padding-top: 20px;
  background-color: lightblue;
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 200px;
`;

const Memo = styled.div`
  margin: 10px;
  align-items: center;
  display: flex;
`;

const MemoText = styled.input`
  margin-left: 10px;
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

  const handleOnChangeTime = (event: any, memo: any) => {
    var dataChange = {
      "pub_date": `${event.format()}`
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

  return (
    <div >
      <TopBar>
        <TopBarFont>Daily Routine</TopBarFont>
      </TopBar>
      <Body>
        <Button onClick={AddMemo}>Add</Button>
        <div>
          {memos.map((memo, i) =>
            <Memo key={i}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  value={memo.pub_date}
                  onChange={e => handleOnChangeTime(e, memo)}
                  format="YYYY-MM-DD HH:MM"
                />
              </MuiPickersUtilsProvider>
              <MemoText value={memo.description} onChange={e => handleOnChangeText(e, memo)}></MemoText>
              <button onClick={() => deleteMemo(memo)}>X</button>
            </Memo>
          )}
        </div>
        {/* <button onClick={() => time}>CheckTable</button> */}
      </Body>
    </div>
  );
}

export default App;
