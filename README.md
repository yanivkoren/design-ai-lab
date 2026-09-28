# Design AI Lab

Standalone static playground for the greeting-card design feasibility study.

## Included in V0
- Test Case editor (Hebrew content, image, ratio, colors, fonts, assets, protected areas)
- Modular Prompt Builder: edit, toggle, reorder by drag/drop or arrows, duplicate, delete
- Raw Prompt mode
- Editable output contract (Schema v1)
- AI response inspector with JSON/fenced-JSON parsing
- V0 validator (bounds, roles, exact protected text, allowed colors/fonts/assets, protected-area overlap)
- Experimental renderer with bounding boxes
- Experiment history in localStorage
- Import/export experiment JSON

## Run locally
Open `index.html` directly, or serve the directory with any static HTTP server.

## Deploy
The project is a dependency-free static site and can be deployed directly to Vercel.
