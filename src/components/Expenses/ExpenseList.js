import { Fragment } from "react";
import styles from './ExpenseList.module.css';
import ExpenseItem from "./ExpenseItem";
function ExpenseList(props){
    const data = props.data;
   const content = data.map((item,index)=><ExpenseItem key={item.id} index={index}  id={item.id} remove={props.remove} name={item.name} price= {item.price}/>); 

    return <Fragment>
        <ul className={styles.list_itme}>{content}</ul>
    </Fragment>

}
export default ExpenseList