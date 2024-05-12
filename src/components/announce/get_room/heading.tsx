import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeadingProps {
  process: "idle" | "editing" | "done";
  back: () => void;
  step: number;
  label: string;
}

export function AnnounceHeading({ process, back, step, label }: HeadingProps) {
  return (
    <Button
      className={cn(
        "rounded-lg border px-6 py-12 shadow-lg transition-colors duration-300 ease-in",
        process === "idle" &&
          "cursor-not-allowed border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
        process === "editing" && "bg-slate-700 text-white hover:bg-slate-800",
        process === "done" &&
          "border-slate-200 bg-white text-slate-300 hover:bg-slate-500 hover:text-slate-100",
      )}
      onClick={() => {
        if (process === "done") back();
      }}
    >
      <div className="flex w-full items-center gap-2">
        {process === "done" ? (
          <svg
            width="43"
            height="35"
            viewBox="0 0 43 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.133789 20.1518L5.17734 15.1083L14.4155 24.3429L37.9176 0.84082L42.9612 5.88437L14.412 34.43L0.133789 20.1518Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <h2 className="text-5xl font-bold">
            {String(step).padStart(2, "0")}
          </h2>
        )}
        <h2 className="text-lg">{label}</h2>
      </div>
    </Button>
  );
}
