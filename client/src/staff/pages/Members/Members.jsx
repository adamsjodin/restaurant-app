import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllUsers } from "../../../utils/functions";
import MembersCard from "./MembersCard";

export default function Members() {

  const [members, setMembers] = useState("members");

  //Fetching code
  const memberQuery = useQuery({
    queryKey: ["menu"],
    queryFn: getAllUsers,
  });

  const memberItems = memberQuery?.data?.menu || [];

  if (memberQuery.isLoading)
    return (
      <h1 style={{ minHeight: "100vh", padding: "2em" }}>Members loading...</h1>
    );
  if (memberQuery.isError) {
    return <pre>{JSON.stringify(memberQuery.error)}</pre>;
  };

  const filterMembers = memberItems.filter((member) =>
    members === "members" ? member.role === "member" : member.role === "staff"
  );

  const membersEl = filterMembers.map((member, i) => {
    return <MembersCard key={i} member={member} />
  });

  return (
    <article className="orders members">
      <section className="order-history__container">
        <section className="order-history__tabs">
          <p
            onClick={() => setMembers('members')}
            className={members === "members" ? "active" : ""}
          >Members</p>
          <p
            onClick={() => setMembers('staff')}
            className={members === "staff" ? "active" : ""}
          >Staff</p>
        </section>
        <section className="order-history__orders">
          {membersEl}
        </section>
      </section>
    </article>
  )
}
