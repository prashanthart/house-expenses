import styles from './ExpenseItem.module.css'; 

function ExpenseItem(props){

    const clickHandler = (event)=>{
        props.remove(props.id);
    }

    return (
        <div className={styles.card}>
            <p>{props.index+1}</p>    
            <p className={styles.name}>{props.name}</p>
            <p>{props.price}/-</p>
            <button onClick={clickHandler}>x</button>
        </div>
    )

}
export default ExpenseItem;