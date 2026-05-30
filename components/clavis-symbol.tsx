export function ClavisSymbol() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 800 800"
        fill="none"
        className="absolute -right-[20%] top-1/2 -translate-y-1/2 w-[140%] h-[140%] lg:w-[100%] lg:h-[100%] lg:-right-[10%] opacity-[0.03]"
      >
        {/* Large abstract key/clavis symbol */}
        <g stroke="currentColor" strokeWidth="2" className="text-foreground">
          {/* Outer hexagonal shape */}
          <path d="M400 50L700 200V600L400 750L100 600V200L400 50Z" />
          
          {/* Inner geometric patterns */}
          <path d="M400 150L600 275V525L400 650L200 525V275L400 150Z" />
          <path d="M400 250L500 325V475L400 550L300 475V325L400 250Z" />
          
          {/* Key stem */}
          <line x1="400" y1="350" x2="400" y2="700" />
          <line x1="350" y1="600" x2="450" y2="600" />
          <line x1="350" y1="650" x2="420" y2="650" />
          
          {/* Central keyhole */}
          <circle cx="400" cy="400" r="60" />
          <circle cx="400" cy="400" r="30" fill="currentColor" fillOpacity="0.1" />
          
          {/* Decorative lines */}
          <line x1="200" y1="400" x2="340" y2="400" />
          <line x1="460" y1="400" x2="600" y2="400" />
          <line x1="400" y1="200" x2="400" y2="340" />
          
          {/* Corner accents */}
          <path d="M250 250L300 200L350 250L300 300L250 250Z" />
          <path d="M550 250L500 200L450 250L500 300L550 250Z" />
          <path d="M250 550L300 500L350 550L300 600L250 550Z" />
          <path d="M550 550L500 500L450 550L500 600L550 550Z" />
        </g>
      </svg>
    </div>
  )
}
