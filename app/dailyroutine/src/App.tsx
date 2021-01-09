import React, { useState } from 'react';


interface Memos {
  id: number;
  description: string;
  // date: Date;
};


function App() {
  const [memos, setMemos] = useState<Memos[]>([
    {
      id: 1,
      description: "Do something",
    },
    {
      id: 5,
      description: "Rest",
    }
  ]);

  const addData = () => {
    setMemos([...memos,{id: 10, description: "Write something"}])
  }

  const handleOnChange = (event: any, memoId: number) => { //OK
    for(var i in memos){
      if(memos[i].id === memoId) {
        memos[i].description = event.target.value;
        break;
      };
    }
    setMemos(memos);  
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
            <div key={i}>
              <input value={memo.description} onChange={e => handleOnChange(e, memo.id)}></input>
            </div>
          )}
          <button onClick={addData}>Add</button>
        </div>
      </body>
    </div>
  );
}

export default App;
