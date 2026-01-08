import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-20">
        <Card className="p-10 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Control Panel
          </h1>

          <p className="text-white/60 mb-8">
            Your automation is active and ready.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5">
              ✅ Dashboard page loaded successfully
            </div>

            <Button className="w-full">
              Manage Automations
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
