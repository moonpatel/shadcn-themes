import { Input } from "@/components/custom-ui/input";

export default function ColorSwatch({
  color,
  onChange,
  label,
}: {
  color: string;
  label: string;
  onChange: (key: string, val: string) => void;
}) {
  return (
    <div className="relative">
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(label, e.target.value)}
        className="w-10 h-10 p-0 size-8 shadow-lg rounded-none absolute opacity-0"
      />
      <div
        className="w-10 aspect-[1.3] rounded-md shadow-lg"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}
