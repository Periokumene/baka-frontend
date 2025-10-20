import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';


const FormSchema = z.object({
  age : z.number().min(18).max(64),
  address : z.string().min(5, {message:"HELLOWORLD"}),
  city: z.string().min(2, {message:"HELLOWORLD"})
})
type FormData = z.infer<typeof FormSchema>;
// interface FormData{
//   age : number;
//   address : string;
//   city : string;
// }


export default function Form() {
  const refName = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors, isValid}
  } = useForm<FormData>({resolver: zodResolver(FormSchema)});

  const handleRefSubmit = (event: React.FormEvent) =>{
    event.preventDefault();
    if (refName.current !== null)
    {
      console.log(refName.current.value);
      refName.current.value = "";
    }
  };

  const handleHookSubmit = handleSubmit(data=>{
    console.log(data);
  });


  return (
    <>
      <form onSubmit={handleRefSubmit}>
        <label htmlFor="nameInput" className="form-label">NAME</label>
        <input ref={refName} id="nameInput" className="form-control"></input>
        <label htmlFor="ageInput" className="form-label">AGE</label>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      <br/>
      <form onSubmit={handleHookSubmit}>
        <label htmlFor="age" className="form-label">AGE</label>
        <input
          id="age" className="form-control" type="number"
          {...register("age", {valueAsNumber:true})}>
        </input>
        { errors.age && <span className="text-danger">{errors.age.message}</span>}

        <br/>
        <label htmlFor="gender" className="form-label">GENDER</label>
        <input
          id="ADDRESS" className="form-control"
          {...register("address", { required : true })}>
          {/*上面是没有引入zod和zodResolver的情况下纯使用useForm的验证写法*/}
        </input>
        {/*{ errors.address?.type === "required" && <span>MUST HAVE !</span>}*/}

        <label htmlFor="cities" className="form-label">CITY</label>
        <input
          id="cities" className="form-control"
          {...register("city")}>
        </input>
        { errors.city && <span className="text-danger">{errors.city.message}</span>}

        <br/>
        <button disabled={!isValid} className="btn btn-warning">SUBMIT</button>
      </form>
    </>
  );
}