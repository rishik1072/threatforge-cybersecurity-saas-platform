const stats = [
  { value: "1.2B+", label: "Indicators analyzed daily" },
  { value: "42s", label: "Median time to detect" },
  { value: "99.99%", label: "Platform uptime SLA" },
  { value: "6,400+", label: "Organizations protected" },
];

export function StatsSection() {
  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
