import { useState } from "react";
import styles from './AddExpense.module.css'

function AddExpense(props){
    const [name,setName]=useState("");
    const [price,setPrice] = useState("");

    const nameChangeHandler = (event)=>{
        setName(event.target.value);
    }


    const priceChangeHandler = (event)=>{
        setPrice(event.target.value);
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        const makeItem = {
            id:Math.random()+Date.now(),
            name,
            price:+price
        }
        if(makeItem.name.trim().length<=0 || (makeItem.price===0)){
            return;
        }
        props.addItem(makeItem);
        setName('');
        setPrice('');
    }

    return <form>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={nameChangeHandler} value={name}/>
        </div>
        <div>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" onChange={priceChangeHandler} value={price}/>
        </div>
        <div className={styles.actions}>
            <button onClick={submitHandler}>Add</button>
        </div>


    </form>

}
export default AddExpense;