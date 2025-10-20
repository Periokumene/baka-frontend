import { useState } from 'react';
import reactLogo from './assets/react.svg';

import Message from './Message';
import ListGroup from './components/ListGroup';
import Alert from './components/Alert';
import Button from './components/Button/Button';

import { BsFillCalendarFill } from 'react-icons/bs';
import { TbCloverFilled } from "react-icons/tb";
import Form from './components/Form';

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { ExpenseCart } from './components/ExpenseCart';
import EffectTest from './EffectTest';


export default function App() {
  const items = ["A", "B", "C"];
  const genders = ["Male", "Female", "Other"];
  return (
    <>
      <EffectTest/>
      <div>-------------------------------</div>
      <ExpenseCart/>
      <div>-------------------------------</div>
      <Form/>
      <BsFillCalendarFill/>
      <LoveButton/>
      <div>Title</div>
      <Alert>
        <div>ALERT!</div>
      </Alert>

      <Button children={"HELL"}/>
      <Button children={"HELL"}
              color="info"
              onClick={() => { alert("HELLO")}}
      />
      <Message />
      <ListGroup
        items={items}
        heading='Cities'
        postSelectedItem={(item:string)=>{ alert("CITIES: " + item)}}
      />
      <ListGroup
        items={genders}
        heading='Genders'
        postSelectedItem={(item:string)=>{ alert("GENDERS: " + item)}}
      />
    </>
  );
}

function LoveButton(){
  const [color, setColor] = useState('black');
  function handleClick(){
    setColor(color === 'black' ? 'red' : 'black');
  }

  return <TbCloverFilled size='100px' onClick={handleClick} color={color}/>
}



