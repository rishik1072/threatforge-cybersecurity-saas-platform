const companies = ["NIMBUS FINANCIAL", "VERTEX HEALTH", "ORION RETAIL", "ATLAS LOGISTICS", "PRISM MEDIA", "COBALT ENERGY"];

export function LogoCloud() {
  return (
    <section className="border-y bg-muted/30 py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by security teams defending critical infrastructure worldwide
        </p>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {companies.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center text-center text-sm font-semibold tracking-tight text-muted-foreground/50"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
