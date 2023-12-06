import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../utils/functions";
import MembersCard from "./MembersCard";

export default function Members() {
  //Fetching code
const memberQuery = useQuery({
 queryKey: ["menu"],
 queryFn: getAllUsers,
});

const memberItems = memberQuery?.data?.menu || [];
console.log(memberItems)

if (memberQuery.isLoading)
 return (
   <h1 style={{ minHeight: "100vh", padding: "2em" }}>Members loading...</h1>
 );
if (memberQuery.isError) {
 return <pre>{JSON.stringify(memberQuery.error)}</pre>;
}

const membersEl = memberItems.map((member, i) => {return <MembersCard key={i} member={member} />})
   
return (
   <article className="orders members">
     <h1>Members</h1>
     <section className="order-history__container">
       <section className="order-history__tabs">
         <p>All members</p>
       </section>
      
       <section className="order-history__orders">
        {membersEl}
       </section>
     </section>
   </article>
)
}
