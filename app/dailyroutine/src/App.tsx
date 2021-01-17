import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const TopBar = styled.div`
  background-color: #505668;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  position: absolute;
  /* z-index: ; */
`;

const TopBarFont = styled.div`
  margin-top: 10px;
  font-size: 24px;
  color: #f1ece1;
`;

const Body = styled.div`
  background-color: whitesmoke;
  background-image: url('https://get.pxhere.com/photo/desk-notebook-writing-table-book-pen-diary-journal-writer-paper-education-brand-document-knowledge-pen-and-paper-611823.jpg');
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  margin-top: 50px;
  padding: 10px 20px;
  background-color: #ecd596;
  height: 100vh;
  width: 382px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 2px 8px 2px #2c2c2c;
  overflow: scroll;
`;

const Button = styled.button`
  background-color: #c05805;
  color: #f1ece1;
  padding: 10px 40px;
  border-color: transparent;
  border-radius: 5px;
  &:Hover {
    background-color: #505668;
  }
  /* box-shadow: 1px 3px 8px 5px #888888; */
`;

const FontButton = styled.div`
  font-size: 20px;
`;

const Memo = styled.div`
  margin: 10px;
  align-items: center;
  display: flex;
  /* padding-bottom: 5px;
  border: 1px solid;
  border-color: transparent;
  border-bottom-color: #303030; */
`;

const MemoText = styled.input`
  margin: 0px 10px;
  background-color: transparent;
  border: 1px solid;
  border-color: transparent;
  border-bottom-color: #949494;
  height: 28px;
  &:hover {
    border: 1px solid;
    border-color: transparent;
    border-bottom-color: #3a3a3a;
  }
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
        <Content>
          <Button onClick={AddMemo}>
            <FontButton>Add list</FontButton>
          </Button>
          <div>
            {memos.map((memo, i) =>
              <Memo key={i}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DateTimePicker
                    value={memo.pub_date}
                    onChange={e => handleOnChangeTime(e, memo)}
                    format="YYYY-MM-DD HH:mm"
                  // inputVariant= "outlined"
                  />
                </MuiPickersUtilsProvider>
                <MemoText value={memo.description} onChange={e => handleOnChangeText(e, memo)}></MemoText>
                <button onClick={() => deleteMemo(memo)}>X</button>
              </Memo>
            )}
          </div>
          {/* <button onClick={() => time}>CheckTable</button> */}
        </Content>
      </Body>
    </div>
  );
}

export default App;
