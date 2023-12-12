import "./members.scss"

export default function MembersCard( {member} ) {
  return (
    <div className='order-history__card'>
      <p>Name: <br /> {member.name}</p>
      <p>User Id: <br /> {member.id}</p>
      <p>E-mail: <br /> {member.email}</p>
      <p>Phone: <br /> {member.phone}</p>
    </div>
  )
}
