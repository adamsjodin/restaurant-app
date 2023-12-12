import Button from "../Button/Button";

export default function LogoutConf({ action, state }) {
  return (
    <section className="popup" style={{maxWidth: '30rem'}}>
      <h3>Are you sure you want to log out?</h3>
      <div
        style={{ display: "flex", justifyContent: "center", gap: "1em", alignItems: "center" }}
      >
        <Button onClick={() => action()}>Yes</Button>
        <Button onClick={() => state(false)}>No</Button>
      </div>
    </section>
  );
}
