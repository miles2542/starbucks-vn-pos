# Fixed Aspect Grid Layout and Uniform Viewport Scaling

We will build the simulator using React, TypeScript, Vite, and Tailwind CSS, rendering a fixed-resolution POS canvas (e.g. 1920x1080 or matching native aspect ratio) scaled uniformly with CSS `transform: scale()` rather than responsive fluid reflow.

## Context
Starbucks OnePOS relies on fixed physical button coordinates (7x3 Category grid, 7x7 Item grid) for cashier muscle memory and layout memorization. Fluid responsive reflow would rearrange buttons across different screen sizes and destroy training validity.

## Decision
1. Fix the internal canvas to a canonical resolution matching the POS aspect ratio.
2. Auto-scale to fill 100% of viewport width/height on mobile and desktop, with a manual scale override control for PC monitors.
3. State managed via Zustand for low-latency line item mutations and fast menu transitions.
