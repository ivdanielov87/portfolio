Project Specification: Angular Portfolio (v0 Design)
This document outlines the technical requirements for generating an Angular application based on the design provided in the reference link.

1. Project Initialization
Framework: Angular (Latest stable version, Standalone Components).

Styling: SCSS (Sass). Each component MUST have its own dedicated .scss file.

Git: Initialize a local Git repository immediately after ng new. Perform an "Initial commit".

2. Design & Responsiveness (Reference)
Reference URL: https://v0.app/chat/portfolio-website-layout-vaH6EZp58JD

Core Design: Replicate the layout, dark theme, and spacing from the v0 template.

Responsive Layout:

Mobile-First approach.

Use standard CSS Flexbox and CSS Grid.

Ensure a clean layout transition from mobile (stacked) to desktop (grid-based).

Global Styles: Create a _variables.scss in src/styles/ for primary colors, background tones, and spacing constants.

3. Component Architecture
Generate the following components, ensuring each folder contains .ts, .html, and .scss files:

NavbarComponent: Sticky navigation with links (Home, Projects, Skills, Contact) and a mobile hamburger menu.

HeroComponent: Large heading, sub-headline, and a Call-to-Action (CTA) button.

ProjectsComponent: A responsive grid of project cards with titles, descriptions, and tech tags.

SkillsComponent: Icon-based or list-based section for technical stack.

ContactComponent: Form with input validation (Name, Email, Message).

FooterComponent: Social links and copyright notice.

4. Implementation Steps for Windsurf
Step 1: Scaffold a new Angular project with SCSS support.

Step 2: Run git init, add files, and commit.

Step 3: Setup global SCSS variables for the dark theme colors from the v0 design.

Step 4: Build the UI components one by one, ensuring the SCSS is scoped to each component.

Step 5: Apply media queries within each component's SCSS to ensure full responsiveness.

Step 6: Implement smooth scrolling for internal navigation links.