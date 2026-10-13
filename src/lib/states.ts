// Props that force a control into one visual state for the state tables.
// Hover, focus, and pressed use data-state (see the variants in globals.css);
// selected and disabled use the real ARIA or HTML attributes.

export type ControlState = "rest" | "hover" | "focus" | "pressed" | "selected" | "disabled";

export const controlStates: ControlState[] = ["rest", "hover", "focus", "pressed", "selected", "disabled"];

export function forceState(state: ControlState | undefined, selectedAttr: "aria-pressed" | "aria-checked" | "aria-selected" = "aria-pressed") {
  if (!state) return {};
  if (state === "disabled") return { disabled: true };
  if (state === "selected") return { [selectedAttr]: true, "data-state": "selected" };
  return { "data-state": state };
}
