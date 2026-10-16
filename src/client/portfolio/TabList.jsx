export default function TabList({
  id,
  label,
  items,
  active,
  onChange,
  className = "",
  orientation = "horizontal",
}) {
  function navigate(event, index) {
    let next;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % items.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + items.length - 1) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    onChange(next);
    const tabs =
      event.currentTarget.parentElement.querySelectorAll('[role="tab"]');
    tabs[next]?.focus();
  }
  return (
    <div
      className={className}
      role="tablist"
      aria-label={label}
      aria-orientation={orientation}
    >
      {items.map((item, index) => (
        <button
          key={item.key || index}
          id={`${id}-tab-${index}`}
          role="tab"
          aria-selected={active === index}
          aria-controls={`${id}-panel`}
          tabIndex={active === index ? 0 : -1}
          onClick={() => onChange(index)}
          onKeyDown={(event) => navigate(event, index)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
