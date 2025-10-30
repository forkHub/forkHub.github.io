# BASIK Project Copilot Instructions

This document provides essential knowledge for AI agents working with the BASIK JavaScript template project.

## Project Overview

BASIK is a canvas-based JavaScript template designed for teaching programming to beginners. The project emphasizes:

- Simplified procedural commands over complex OOP patterns
- Immediate visual feedback through canvas rendering
- Built-in functions for common graphics operations
- Ready-to-use project structure

## Core Architecture

### Canvas Management
- All drawing operations happen on an HTML5 canvas
- Canvas initialization required via `buatKanvas(width, height, canvas, mode)`
- Canvas coordinate system starts from top-left (0,0)

### Command Patterns
- Commands use simplified procedural style without dot notation
- Naming convention: camelCase for multi-word commands (e.g., `muatGambar`, `buatKanvas`)
- Parameters use positional arguments (no named parameters)
- Optional semicolons at end of commands

### Key Components

1. Graphics System
- Image loading: `muatGambar(filename)`
- Drawing: `stempel(image)` 
- Text positioning: `posisiTeks(x, y)`
- Screen clearing: `bersihkanLayar()`

2. Event Handling
- Mouse events: `mouseDitekan()`, `mouseDilepas()`
- Keyboard events: `keyboardDitekan()`, `keyboardDilepas()`
- Game loop: `update()` function

3. Asset Management
- Images stored in `asset` folder
- Images automatically load when referenced
- Check load status with `semuaGambarSelesaiDimuat()`

## Common Development Workflows

1. Project Setup
- Copy template folder for new projects
- Open `index.html` in browser
- Edit `index.js` for game logic

2. Debug Process
- Use browser refresh (F5) to see changes
- Check browser console for errors
- Add comments with `//` for code documentation

## Key Files
- `index.html` - Entry point
- `index.js` - Main game logic
- `asset/` - Image and sound resources
- `doc/` - Documentation markdown files

## Integration Points

1. Browser Integration
- Works offline without server
- Responsive canvas sizing
- Touch input support for mobile devices

2. Asset Pipeline
- Supports PNG images with transparency
- Image coordinates use pixel values
- Handle loading state with `semuaGambarSelesaiDimuat()`

## Best Practices

1. Variable Usage
- Declare with `let` keyword
- Use camelCase naming
- No spaces in variable names
- Clear, descriptive names

2. Code Organization
- Group related commands together
- Use comments to explain logic
- Keep update loop efficient

3. Graphics
- Set image center points for rotation
- Clear screen before redrawing
- Use relative positioning for responsive layouts