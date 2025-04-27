export default function MsgBox({ title = "title", msg = "msg" }) {
  return (
    <>
      <div
        style={{
          background: "red",
          padding: "8px",
          width: "500px",
        }}
      >
        <h4>{title}</h4>
        <p>{msg}</p>
      </div>
    </>
  );
}
