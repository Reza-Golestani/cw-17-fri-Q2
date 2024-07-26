import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usersSchema } from "../schema/usersSchema";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function InfoForm() {
  const QC = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(usersSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: 1,
      age: 0,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) =>
      await axios.post("http://localhost:3000/users", data),
    onSuccess: () => {
      QC.invalidateQueries({
        queryKey: ["data"],
      });
    },
  });

  const onSubmit = (formValues) => {
    mutate(formValues);
  };

  const onError = (error) => {
    console.log(error);
  };

  //   console.log(watch())
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col shadow-md p-8 items-start rounded-lg gap-1"
    >
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        {...register("firstName")}
        className="border border-slate-300 rounded-md w-full"
      />
      <label htmlFor="lastName">Last Name:</label>{" "}
      <input
        type="text"
        id="lastName"
        {...register("lastName")}
        className="border border-slate-300 rounded-md w-full"
      />
      <label htmlFor="gender">Gender:</label>{" "}
      <select
        {...register("gender", { valueAsNumber: true })}
        id="gender"
        className="border border-slate-300 rounded-md w-full"
      >
        {/* <option value="">Please select...</option> */}
        <option value={1}>Male</option>
        <option value={2}>Female</option>
      </select>
      <label htmlFor="lastName">Age:</label>
      <input
        type="number"
        id="lastName"
        {...register("age", { valueAsNumber: true })}
        className="border border-slate-300 rounded-md w-full"
      />
      <input
        type="submit"
        value="Submit"
        className="p-2 bg-green-700 text-white rounded-md"
      />
    </form>
  );
}
