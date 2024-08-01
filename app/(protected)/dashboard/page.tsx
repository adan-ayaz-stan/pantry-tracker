import MainWindow from "./_components/MainWindow";
import Navbar from "./_components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white p-8 py-4 flex flex-col gap-4">
      <Navbar />
      <MainWindow />
    </div>
  );
}
