export default function Card({firstName, lastName, age}) {
  return (
    <div className="flex flex-col p-2 gap-1">
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{age}</p>
    </div>
  )
}
