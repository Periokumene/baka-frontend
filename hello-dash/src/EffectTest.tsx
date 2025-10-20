
import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';

interface User{
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  }
};

export default function EffectTest() {
  const [users, setUsers] = useState<User[]>([]);
  const [err, setErr]     = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{
    const Aborter = new AbortController();

    setIsLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", { signal:Aborter.signal})
      .then(res=>{
        setErr('');
        setUsers(res.data);
      })
      .catch(err => {
        setErr(err.message);
      })
      .finally(()=>{
        setIsLoading(false);
      });

    return ()=>{Aborter.abort();}
  }, []);

  return (<>
    <h1>EFFECT</h1>
    { err && <div className="text-danger"> ERROR: {err} </div> }
    { isLoading && <div className="spinner-border"></div> }
    <ul>
      {users.map(user=>( <li key={user.id}> {user.name} ({user.email}) </li> ))}
    </ul>
  </>);
}