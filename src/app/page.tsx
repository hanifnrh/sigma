
"use client";

import StatsWidget from "@/components/ui/stats";
import StatusSafe from "@/components/ui/status-safe";
import Clock from '../components/ui/Clock';
import ParticlesBackground from '../components/ui/ParticlesBackground';
import StatusDanger from '../components/ui/status-danger';
import StatusGood from '../components/ui/status-good';
import StatusWarning from '../components/ui/status-warning';
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 pt-36 font-mono">
      <div>
        <ParticlesBackground></ParticlesBackground>
      </div>
      <Clock locale="en-CA" />
      <h1 className="heading-hero font-bold text-center">
        Welcome to Sigma!
      </h1>
      <div className="body text-center pt-5">
        Monitor your chicken farm here! <br />
        We got you a few parameters you can monitor
      </div>
      <div className="status-wrapper flex-row flex pt-10">
        <div className="status mx-2">
          <StatusSafe></StatusSafe>
        </div>
        <div className="status mx-2">
          <StatusGood></StatusGood>
        </div>
        <div className="status mx-2">
          <StatusWarning></StatusWarning>
        </div>
        <div className="status mx-2">
          <StatusDanger></StatusDanger>
        </div>

      </div>

      <StatsWidget></StatsWidget>
    </main>
  );
}
