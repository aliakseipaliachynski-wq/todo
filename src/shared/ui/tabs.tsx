export type TabId = string;

/** Single tab definition for Tabs. */
export interface TabItem {
  id: TabId;
  label: string;
}

/** Props for the tab list. Requires aria-label for accessibility. */
export interface TabsProps {
  tabs: TabItem[];
  activeId: TabId;
  onSelect: (id: TabId) => void;
  "aria-label": string;
}

/** Renders a tab list; one tab is active and onSelect is called when user selects another. */
export function Tabs({
  tabs,
  activeId,
  onSelect,
  "aria-label": ariaLabel,
}: TabsProps): React.ReactElement {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex gap-1 rounded-lg border border-gray-200 bg-gray-100 p-1"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            id={`tab-${tab.id}`}
            className={`
              rounded-md px-4 py-2 text-sm font-medium
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              ${isActive ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"}
            `}
            onClick={() => onSelect(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
