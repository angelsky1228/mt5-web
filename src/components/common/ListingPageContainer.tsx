import { PropsWithChildren, ReactNode } from "react";
import { IconPlus, IconDownload, IconUpload } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

type Props = PropsWithChildren<{
  title: string;
  description?: string;
  actions?: ReactNode;
  filters?: ReactNode;
  footer?: ReactNode;
  density?: "comfortable" | "compact";
  fullWidth?: boolean;
  // Convenience action props (alternative to passing full actions node)
  addButtonLabel?: string;
  onAddClick?: () => void;
  exportButtonLabel?: string;
  onExportClick?: () => void;
  exportDisabled?: boolean;
  importButtonLabel?: string;
  onImportClick?: () => void;
  secondaryButtonLabel?: string;
  onSecondaryClick?: () => void;
}>;

export function ListingPageContainer({
  title,
  description,
  actions,
  filters,
  footer,
  density = "comfortable",
  fullWidth = false,
  addButtonLabel,
  onAddClick,
  exportButtonLabel,
  onExportClick,
  exportDisabled = false,
  importButtonLabel,
  onImportClick,
  secondaryButtonLabel,
  onSecondaryClick,
  children,
}: Props) {
  const gap = density === "compact" ? "gap-2" : "gap-3";

  // Build action buttons if convenience props are provided
  const builtActions = !actions ? (
    <div className="flex items-center gap-1.5 flex-wrap">
      {onSecondaryClick && secondaryButtonLabel && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onSecondaryClick}
        >
          {secondaryButtonLabel}
        </Button>
      )}
      {onExportClick && exportButtonLabel && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={exportDisabled}
          startIcon={<IconDownload />}
          onClick={onExportClick}
        >
          {exportButtonLabel}
        </Button>
      )}
      {onImportClick && importButtonLabel && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          startIcon={<IconUpload />}
          onClick={onImportClick}
        >
          {importButtonLabel}
        </Button>
      )}
      {onAddClick && addButtonLabel && (
        <Button
          type="button"
          size="sm"
          startIcon={<IconPlus />}
          onClick={onAddClick}
        >
          {addButtonLabel}
        </Button>
      )}
    </div>
  ) : null;

  return (
    <div
      className={cn(
        "flex flex-col h-full min-h-0",
        gap,
        !fullWidth && "mx-auto max-w-[1536px]"
      )}
    >
      {/* Header */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-2">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#1b365d]">{title}</h1>
          {description && (
            <p className="mt-0.5 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {actions ?? builtActions}
      </div>

      {/* Filters */}
      {filters && (
        <div className="shrink-0 rounded-lg border border-[var(--border)] bg-white p-3">
          {filters}
        </div>
      )}

      {/* Content */}
      <div className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="shrink-0 flex justify-end">
          {footer}
        </div>
      )}
    </div>
  );
}
