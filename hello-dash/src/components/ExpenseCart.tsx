import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';



enum OrderCat{
  A = "A",
  B = "B",
  C = "C"
}
enum OrderCatFilter{
  ShowAll = "ShowAll",
  A = "A",
  B = "B",
  C = "C"
}

const FOrderSchema = z.object({
  description : z.string(),
  amount : z.number().min(0).max(999),
  // category : z.string()
  category : z.enum(OrderCat)
});
type FOrderType = z.infer<typeof FOrderSchema>;



const initialOrders : FOrderType[] = [
  {
    description: "FUCK-A-1",
    amount: 100,
    category: "A"
  },
  {
    description: "FUCK-B-1",
    amount: 100,
    category: "B"
  },
  {
    description: "FUCK-B-2",
    amount: 100,
    category: "B"
  },
  {
    description: "FUCK-C-1",
    amount: 100,
    category: "C"
  },
  {
    description: "FUCK-C-2",
    amount: 100,
    category: "C"
  },
];



export const ExpenseCart = () => {
  const [orders, setOrders] = useState<FOrderType[]>(initialOrders);

  return <>
    <OrderForm orders={orders} setOrders={setOrders}/>
    <CartTable orders={orders} setOrders={setOrders}/>
  </>;
};




function OrderForm({orders, setOrders}){
  const { register, handleSubmit, watch, formState : { errors, isValid }} = useForm<FOrderType>({resolver:zodResolver(FOrderSchema)});
  const onSubmit = (data : FOrderType)=>{
    console.log(data);
    const newOrders = [...orders, data];
    setOrders(newOrders);
  };


  return (
    <>

      <h3>Order Form</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">Desc</span>
            <input { ...register('description')}
                   type="text" className="form-control" placeholder="Description" aria-label="Username" aria-describedby="basic-addon1"
            />
          </div>
          <div className="form-text" id="basic-addon4">{errors.description?.message}</div><br/>

          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">$</span>
            <input { ...register('amount', {valueAsNumber:true})}
                   type="number" className="form-control" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon1"
            />
          </div>
          <div className="form-text" id="basic-addon4">{errors.amount?.message}</div><br/>

          <div className="input-group">
            <span className="input-group-text">Options</span>
            <select { ...register("category") } className="form-select">
              { Object.values(OrderCat).map(filter=><option value={filter} key={filter}>{filter}</option>) }
            </select>
          </div>
          <div className="form-text" id="basic-addon4">{errors.category?.message}</div><br/>
        </div>


        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </>)
}



interface CartTableProps{
  orders: FOrderType[],
  setOrders: (orders : FOrderType[]) => void
};

function CartTable({orders, setOrders} : CartTableProps){
  const [orderFilter, setOrderFilter] = useState<OrderCatFilter>(OrderCatFilter.ShowAll);

  const visibleOrders = orders.filter((curOrder)=>{
    if (orderFilter === OrderCatFilter.ShowAll) return true;
    if (orderFilter !== curOrder.category) return false;
    return true;
  });


  const handleDelete = (removeOrder : FOrderType) =>{
    const newOrders = orders.filter((order, index) => order !== removeOrder);
    setOrders(newOrders);
  }



  return (<>
      <h3>Cart Table</h3>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputFilter">Options</label>
        <select id="inputFilter" className="form-select" onChange={e=>{setOrderFilter(e.target.value)}}>
          <option value="ShowAll">Show All</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {
            visibleOrders.map((order, i) => (
            <tr key={i}>
              <th scope="row">{i}</th>
              <td>{order.description}</td>
              <td>{"$" + order.amount.toFixed(2)}</td>
              <td>{order.category}</td>
              <td>
                <button className="btn btn-danger" onClick={()=>{handleDelete(order)}}>REMOVE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};