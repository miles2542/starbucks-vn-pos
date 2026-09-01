# 01: Core App Shell and Viewport Canvas

**What to build:** A working, fixed-aspect POS touchscreen canvas (16:9) that scales uniformly with CSS transforms to fill any mobile or desktop screen without distorting button geometry, including a floating scale override slider, top Header Bar (terminal ID, live time, register number), and bottom Footer Status Bar (`OnePOS [2.0.10.0]`, business date, cashier name).

**Blocked by:** None (can start immediately)

**Status:** done

- [x] Vite + React 19 + TypeScript + Tailwind CSS configured and runnable with `pnpm dev`
- [x] Viewport engine scaling POS canvas uniformly via `transform: scale()` with aspect-ratio preservation
- [x] Floating view control overlay with zoom options (Fit, 100%, 75%, 50%) and refresh transition toggle
- [x] Header Bar styled identically to reference photos (`M17015 - 17015`, timestamp, `0001`)
- [x] Footer Status Bar styled identically to reference photos (`OnePOS [2.0.10.0]`, Serve type, `Business Date`, cashier name)
- [x] Zero layout distortion or horizontal scrollbars across window resizing
