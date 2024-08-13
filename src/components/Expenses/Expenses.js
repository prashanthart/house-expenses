import ExpenseList from "./ExpenseList";
function Expenses(props){

    const data = props.data;
    console.log("my data",data);

    const removeHandler = (id)=>{
       props.remove(id);
    }


    return <ExpenseList data = {data} remove={removeHandler}/>

}
export default Expenses;