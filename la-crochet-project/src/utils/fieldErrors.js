import { useEffect } from "react";

// Keeps screen readers in step with the red error state.
//
// The red border and message show with CSS (:user-invalid) once someone has
// finished with a field. This tells screen readers the same thing at the same
// moment: it marks the field aria-invalid, links its message (the id in the
// field's data-error) and reads the message out once, after they leave it.
// The form needs an empty <p data-announcer aria-live="polite"> inside it.
export function useFieldErrors(formRef) {
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const announcer = form.querySelector("[data-announcer]");
    const announced = new WeakSet();
    let timer;

    function linkError(field, shown) {
      const errorId = field.dataset.error;
      if (!errorId) return;
      const ids = (field.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) field.setAttribute("aria-describedby", ids.join(" "));
      else field.removeAttribute("aria-describedby");
    }

    function sync(field, announce = false) {
      if (!field.matches?.("input, select, textarea")) return;
      let invalid = false;
      try {
        invalid = field.matches(":user-invalid");
      } catch {
        return; // very old browser: the browser's own messages still work
      }
      field.setAttribute("aria-invalid", String(invalid));
      linkError(field, invalid);

      if (!invalid) {
        announced.delete(field);
        return;
      }
      if (announce && announcer && !announced.has(field)) {
        announced.add(field);
        const message = document.getElementById(field.dataset.error)?.textContent?.trim();
        const label = field.labels?.[0]?.textContent?.trim();
        if (!message) return;
        clearTimeout(timer);
        announcer.textContent = "";
        // Wait for the screen reader to finish reading the next field first.
        timer = setTimeout(() => {
          announcer.textContent = label ? `${label}: ${message}` : message;
        }, 500);
      }
    }

    const onFocusIn = (event) => {
      if (event.target.matches?.("input, select, textarea") && !event.target.hasAttribute("aria-invalid")) {
        event.target.setAttribute("aria-invalid", "false");
      }
    };
    const onLeave = (event) => sync(event.target, true);
    const onEdit = (event) => sync(event.target);
    // On a blocked submit the browser focuses the first problem field and reads
    // it; mark every invalid field once that has happened.
    const onInvalid = (event) => setTimeout(() => sync(event.target), 0);

    form.querySelectorAll("input, select, textarea").forEach((field) => field.setAttribute("aria-invalid", "false"));
    form.addEventListener("focusin", onFocusIn);
    form.addEventListener("focusout", onLeave);
    form.addEventListener("input", onEdit);
    form.addEventListener("change", onEdit);
    form.addEventListener("invalid", onInvalid, true);

    return () => {
      clearTimeout(timer);
      form.removeEventListener("focusin", onFocusIn);
      form.removeEventListener("focusout", onLeave);
      form.removeEventListener("input", onEdit);
      form.removeEventListener("change", onEdit);
      form.removeEventListener("invalid", onInvalid, true);
    };
  }, [formRef]);
}
