# UI Components (shadcn/ui)

All UI in this app is built from shadcn/ui components. Never hand-roll a custom component (button, input, dialog, dropdown, card, etc.) when a shadcn/ui equivalent exists.

## Rules

- **Never create custom components** for things shadcn/ui already provides. Add the missing shadcn/ui component instead of writing one from scratch.
- If a component isn't installed yet (check `components/ui/`), add it via the CLI rather than copy-pasting or writing your own:

  ```bash
  npx shadcn@latest add <component>
  ```

  This respects the project's config in [`components.json`](../components.json) (style `base-luma`, base color `neutral`, icon library `lucide`).
- Import shadcn/ui components with the `@/components/ui/*` alias, e.g. `import { Button } from "@/components/ui/button"`.
- Compose pages/features out of shadcn/ui primitives (`Button`, `Dialog`, `Card`, etc.) rather than raw HTML elements with custom Tailwind styling, so behavior and theming stay consistent.
- Customize appearance through the component's existing variants/props (`variant`, `size`, etc.) or `components.json` theme settings — don't fork a component's source to restyle it unless there is no supported variant/prop for it.
- Icons come from `lucide-react` (the configured `iconLibrary`) to match shadcn/ui components.
