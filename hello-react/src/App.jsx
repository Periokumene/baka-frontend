import {useState, useEffect} from 'react';
import './App.css';


const baseStyle = {
    color: 'red',
    fontSize: '10rem',
};



function App(){
    let [userList, setUserList] = useState([
        {id: 1, name: "John", email: "john@example.com"},
        {id: 2, name: "James", email: "james@example.com"},
        {id: 3, name: "Jess", email: "Jess@example.com"},
        {id: 4, name: "Jack", email: "Jack@example.com"},
    ]);

    function onGetProfileTitle(){
        return "BuildTime";
    };
    function profileClick(event){
        console.log(event);
        setUserList([{id: 1, name: "John", email: "john@example.com"}]);
    };


    return <>
        <h style={{...baseStyle, color: 'blue'}}>Hello</h>
        <p>this is a paper</p>
        <h1 className='text-lowercase'>World</h1>
        <div>------------------------</div>
        <UserComponent
            title='Hello'
            userList={userList}/>

        <ProfileComponent
            profileOnClick={profileClick}
            onGetTitle={onGetProfileTitle}/>

        <LoginComponent
            userList={userList}
            setUserList={setUserList}
        />
        <FeedComponent
            userList={userList}
        />

        <p>-----------------------</p>
        <FuckForm/>
        <LazyPic/>
    </>;
}



function UserComponent(props){
    return <>
        <p>{props.title}</p>
        <ul> { props.userList.map(function(user, i){ return <li key={i}>{user.name}-{user.email}</li>}) }
        </ul>
    </>
}
function ProfileComponent(props){
    return <>
        <h1>{props.onGetTitle()}</h1>
        <button onClick={props.profileOnClick}>Profile Button</button>
    </>;
}
function LoginComponent(props){
    function Clean(){
        props.setUserList([]);
    }
    function New(){
        let copy = props.userList;
        copy.push({id: 5, name: "Jill", email: "???"});
        alert(copy);
        props.setUserList(copy);
    }

    const {userList} = props;
    if (userList.length > 0) return <button onClick={Clean}>Remove</button>;
    else                     return <button onClick={New}>Add</button>;
}
function FeedComponent(props){
    const {userList} = props;
    return <>
        <p>FEEDBACK:</p>
        { userList.length > 0 && <p>Thanks for being with us!</p> }
    </>;
}

function FuckForm(props){
    let [userName, setUserName] = useState('Saki');
    let [userNameErr, setUserNameErr] = useState('');

    const handleOnChange = (e)=>{
        setUserName(e.target.value);
        if (e.target.value.length == 5) setUserNameErr('五字神人');
        else setUserNameErr('!');
        console.log(`event-${e.target.value} | real-${userName}`); // 会有延迟

    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        alert(userName);
    }
    const handleReset = (e)=>{
        e.preventDefault();
        setUserName('saki');
    }

    return <form onSubmit={handleSubmit} onReset={handleReset}>
        UserName: <input
            type='text'
            value={userName}
            onChange={handleOnChange}
        /><p style={{color:'red'}}>{userNameErr}</p>

    <button type='submit'>Submit</button>
    <button type='reset'>Reset</button>
    </form>
};

function LazyPic(props){
    const [title, setTitle] = useState('Loading...');
    const [count, setCount] = useState(0);
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const timer = setInterval(()=>{setCount(count+1)}, 1000);
        return () => { clearInterval(timer); };
    });

    const getData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const task  = await response.json();
        console.log(task);
        setTitle(task.title);
    };
    return <>
        <h1>{title}</h1>
        <h3>{count}</h3>
    </>
};
export default App;