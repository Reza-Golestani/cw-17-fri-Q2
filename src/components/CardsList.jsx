import axios from "axios";
import { useQuery } from "react-query";
import Card from "./Card";

export default function CardsList() {
  const { isLoading, status, data, error, isError } = useQuery({
    queryKey: ["data"],
    queryFn: async () =>
      await (
        await axios.get("http://localhost:3000/users")
      ).data,
  });

//   console.log(data);

  return (
    <>
      {data?.map((user) => (
        <Card key={user.id}
          age={user.age}
          firstName={user.firstName}
          lastName={user.lastName}
        />
      ))}
    </>
  );
}
