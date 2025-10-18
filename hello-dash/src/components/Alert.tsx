import React, { ReactNode, useState } from 'react';


interface Props {
  children : ReactNode;
}


export default function Alert({children = <h1>DefaultAlert</h1>} : Props) {
  const [visibility, setVisibility] = useState(true);

  const className = "alert alert-warning alert-dismissible " + (visibility ? "show" : "fade");
  return (
    <div className={className}>
      {visibility && children}
      {visibility && <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={e=>{setVisibility(false);}}></button>}
    </div>);
}

