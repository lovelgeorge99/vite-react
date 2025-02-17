interface SliderProps {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export function Slider({ id, min, max, step, value, onChange }: SliderProps) {
  return (
    <input
      className="w-full h-2 bg-gray-200 rounded-lg  cursor-pointer"
      type="range"
      id={id}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number.parseFloat(e.target.value))}
    />
  );
}
