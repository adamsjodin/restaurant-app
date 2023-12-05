

export default function Members() {
  //Fetching code
// const memberQuery = useQuery({
//  queryKey: ["members"],
//  queryFn: getAllMembers,
// });

// const memberItems = memberQuery?.data?.members || [];

// if (memberQuery.isLoading)
//  return (
//    <h1 style={{ minHeight: "100vh", padding: "2em" }}>Members loading...</h1>
//  );
// if (MemberQuery.isError) {
//  return <pre>{JSON.stringify(memberQuery.error)}</pre>;
// }

// const membersEl = memberItems.map((member, i) => {<MembersCard key={i} member={member} />})
   
return (
   <article className="members">
     <h1>Members</h1>
     <section className="order-history__container">
       <section className="order-history__tabs">
         <p>All members</p>
         <p> Search </p>
       </section>
      
       <section className="order-history__orders">

       </section>
     </section>
   </article>
)
}
