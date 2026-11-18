import { useEffect } from "react";

// Title + one line about the page, with the page's main buttons on the right.
// Also names the browser tab, so several open admin tabs are easy to tell apart.
export default function AdminPageHeader({ title, description, children }) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | La Crochet back office`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        {description && <p className="mt-1 text-muted">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

// "Couldn't load" box with a retry button, used by every admin page.
export function LoadError({ message, onRetry }) {
  return (
    <div className="alert-error flex flex-wrap items-center justify-between gap-3">
      <span>{message}</span>
      <button type="button" onClick={onRetry} className="cursor-pointer font-bold underline">
        Try again
      </button>
    </div>
  );
}
