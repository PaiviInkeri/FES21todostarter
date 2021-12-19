import React, { useState }  from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'date-fns';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import { TabPanel } from '@mui/lab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role= "tabpanel"
      hidden= {value !== index}
      id= {index}
    >
      {
        value === index && (
          <div>{children}</div>
        )
      }
    </div>
  )
}

export default function App() {
  const [todo, setTodo] = useState({desc: '', date: ''});
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, setValue] = useState(0);

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  } 

  const handleDateChange = (selectedDate) => {
    console.log(selectedDate); //displays the correct date

    //parse date object into a string
    var day = selectedDate.getDate();
    var month = selectedDate.getMonth();
    var year = selectedDate.getFullYear();
    console.log(day + " " + month + " " + year); //month is off by 1??
    var dateToString = day + "." + month + "." + year;

    //trying to set date in todo, doesn´t work
    setTodo({...todo, date: dateToString});
    console.log("This is value of todo.date: " + todo.date);
    console.log(dateToString);
    
  }

  const handleTabs = (event, value) => {
    console.warn(value);
    setValue(value);
  }



  return (
    <div className="App">
      <Tabs value = {value} onChange = {handleTabs}>
        <Tab label="Home" index={0}/>
        <Tab label="My todos" index={1}/>
      </Tabs>

      <TabPanel value={value} index={0}>
        <h2>Welcome to Todo List!</h2>
        </TabPanel>
      <TabPanel value ={value} index={1}>
      <br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      </MuiPickersUtilsProvider>
      <br />

      <TextField label="description" type="text" name="desc" value={todo.desc} onChange={inputChanged}/>
      <Button variant="contained" color="primary" onClick={addTodo}>Add</Button>

      <table><tbody>
      {
      todos.map((todo, index) => 
        <tr key={index}>
          <td>{todo.date}</td>
          <td>{todo.desc}</td>
        </tr>)
      }
      </tbody></table>
      </TabPanel>
    </div>
  );
}

