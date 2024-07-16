export default function Loading() {
  return (
    <div
      className={
        "flex justify-center items-center w-full h-[100vh] bg-custom-primary"
      }
    >
      <div id="loader" className="loader"></div>
    </div>
  );
}
