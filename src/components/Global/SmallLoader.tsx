export default function SmallLoader({ color }: { color?: "white" | "black" }) {
  return (
    <div
      className={`w-5 h-5 ${
        color && color == "white" ? "loader-white" : "loader"
      }`}></div>
  );
}
