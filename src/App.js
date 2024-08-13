import { useEffect, useState } from 'react';
import './App.css';
import Expenses from './components/Expenses/Expenses';
import Header from './components/layouts/Header';
import Modal from './components/UI/Modal';
import AddExpense from './components/Expenses/AddExpense';
import CurrencyFormatter from './components/UI/CurrencyFormat';

function App() {
  const [data,setData] = useState([]);
  const [openModal,setOpenModal] = useState(false);
  const [deleteItem,setDeleteItem] = useState({});
  const [totalAmount,setTotalAmount] = useState(0);

  const getItems = async ()=>{

    const response = await fetch("https://react-http-987b8-default-rtdb.firebaseio.com/house-expense.json")
    if(!response.ok){
      return;
    }
    const jsonRes = await response.json();
    if(!jsonRes || typeof  jsonRes !=='object'){
        return;
    }
    const responseData = Object.entries(jsonRes).map(([key,value])=>{
      return {...value,id:key};

    })
      setData(responseData)
      let amount = 0;
      responseData.forEach(item=>{
      amount += item.price;
    })
    setTotalAmount(amount);

  }

  useEffect(()=>{
    // https://react-http-987b8-default-rtdb.firebaseio.com/house-expense.json

    getItems()

    // let amount = 0;
    // data.forEach(item=>{
    //   amount += item.price;
    // })
    // setTotalAmount(amount);

  },[])

  const remove = (id)=>{
    const index = data.findIndex(item=>item.id===id);  
    if(index!==-1){
      setOpenModal(true);
      setDeleteItem({id,name:data[index].name});
    }
  }

  const confirmRemove = async ()=>{
    // const index = data.findIndex(item=>item.id===deleteItem.id);  
    // if(index!==-1){
    //   const updatedList = [...data];
    //   updatedList.splice(index,1);
    //   setData(updatedList);
    //   setTotalAmount(prev=>{
    //     return prev-data[index].price
    //   })
    // }
    // setDeleteItem({});
    // setOpenModal(false);
    const response = await fetch(`https://react-http-987b8-default-rtdb.firebaseio.com/house-expense/${deleteItem.id}.json`,{
      method:"DELETE"
    })
    if(!response.ok){
      return;
    }
    const index = data.findIndex(item=>item.id===deleteItem.id);
    if(index!==-1){
      const updatedList = [...data];
      updatedList.splice(index,1);
      setTotalAmount(prev=>{
        return prev-data[index].price;
      })
      setData(updatedList);
    }
    setDeleteItem({});
    setOpenModal(false);
  }

  const cancel = ()=>{
    setDeleteItem({});
    setOpenModal(false);

  }

  const addItemHandler = async (item)=>{
    const response = await fetch("https://react-http-987b8-default-rtdb.firebaseio.com/house-expense.json",{
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        'Content-Type':'application/json'
      }
    });
    if(!response.ok){
      return;
    }
    // console.log(await response.json())
    const jsonRes = await response.json();
    const key  = jsonRes.name;

    setData(prev=>{
      return [{...item,id:key},...prev];
    })
    setTotalAmount(prev=>{
      return prev+item.price;
    })
  }


  
  return (
    <div>
      <Header/>
      <AddExpense addItem = {addItemHandler}/>
      {openModal && <Modal item={deleteItem} delete={confirmRemove} cancel={cancel}/>}
      <Expenses data={data} remove={remove}/>
      <h4>Number of items {data.length}</h4>
      <h4>Total Amount <CurrencyFormatter amount={totalAmount}/>/-</h4>
    </div>
  );
}

export default App;
