import Button from "../Button/Button";


export default function LogoutConf({action, state}) {
  return (
    <section className="popup">
    <h3>Are you sure you want to log out?</h3>
    <div>
      <Button onClick={() => action()} children="Yes"/>
      <Button onClick={() => state(false)} children="No"/>
    </div>
  </section>
  )
}
