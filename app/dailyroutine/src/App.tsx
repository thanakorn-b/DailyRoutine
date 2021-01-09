import React, { useState, useEffect } from 'react';


interface Memos {
  id: number;
  description: string;
  // date: Date;
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

  const handleOnChange = (event: any, memoId: number) => { //OK
    // for(var i in memos){
    //   if(memos[i].id === memoId) {
    //     memos[i].description = event.target.value;
    //     break;
    //   };
    // }
    // setMemos(memos);  
  };

  return (
    <div >
      <header>Daily Routine</header>
      <body>
        <div>
          <div>date</div>
        </div>
        <div>
          <div>Today</div>
          {memos.map((memo, i) => 
            <div>
              <input value={memo.description} onChange={e => handleOnChange(e, memo.id)}></input>
            </div>
          )}
          <button onClick={() => console.log(memos)}>Add</button>
        </div>
      </body>
    </div>
  );
}

export default App;
