import { useState } from "react";
import Link from "next/link";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ProfessionAnalyzer() {
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!profession.trim()) return alert("Please type your profession.");
    setLoading(true);
    try {
      const res = await fetch("https://cleveraihub-8.onrender.com/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profession }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      alert("Error: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-4">
      <Card className="p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
              CleverAI • Instant Recommendation
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Type your profession. <span className="text-cyan-300">Get an automation package</span> in seconds.
            </h1>
            <p className="mt-4 text-white/60">
              No-code setup. Connect your own WhatsApp number. Activate CRM + follow-ups + appointments.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                placeholder='e.g. "Real Estate Agent", "Dentist", "Gym Owner"...'
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
              <Button onClick={handleAnalyze} className="sm:w-[180px]">
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
              {["Real Estate", "Salon", "Law Firm", "Clinic", "Restaurant"].map((x) => (
                <button
                  key={x}
                  onClick={() => setProfession(x)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          <div className="md:w-[420px]">
            {!result ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-white font-semibold">What you’ll get</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li>• Recommended automations for your industry</li>
                  <li>• Missing info checklist (what we need from you)</li>
                  <li>• A ready-to-activate package</li>
                </ul>
                <div className="mt-4 text-xs text-white/50">
                  Typical setup time: <span className="text-white/70">3–10 minutes</span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-white font-semibold">{result.title || "Result"}</div>
                  <button
                    onClick={() => setResult(null)}
                    className="text-xs text-white/60 hover:text-white"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-2 text-sm text-white/70">
                  {result.summary}
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-semibold text-white">Automations</div>
                    <div className="mt-2 space-y-1 text-sm text-white/70">
                      {Array.isArray(result.automations) && result.automations.length > 0 ? (
                        result.automations.map((a: string, i: number) => (
                          <div key={i}>• {a}</div>
                        ))
                      ) : (
                        <div className="text-white/50">No items.</div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-semibold text-white">Needed from you</div>
                    <div className="mt-2 space-y-1 text-sm text-white/70">
                      {Array.isArray(result.missingInfoNeeded) && result.missingInfoNeeded.length > 0 ? (
                        result.missingInfoNeeded.map((m: string, i: number) => (
                          <div key={i}>• {m}</div>
                        ))
                      ) : (
                        <div className="text-white/50">No items.</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <Link href="/packages/1" className="flex-1">
                    <Button className="w-full">Start Package</Button>
                  </Link>
                  <Link href="/packages">
                    <Button variant="secondary">Marketplace</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}
