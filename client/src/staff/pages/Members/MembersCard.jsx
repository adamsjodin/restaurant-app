import "./members.scss"

export default function MembersCard( {member} ) {
  return (
    <div className='order-history__card'>
      <p>Name: {member.name}</p>
      <p>User Id: {member.id}</p>
      <p>E-mail: {member.email}</p>
      <p>Phone: {member.phone}</p>
    </div>
  )
}
