import { useState } from "react";

type ConfigsCategory = "marketing" | "product" | "team" | "financial";

interface ConfigsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (allocation: Record<ConfigsCategory, number>) => void;
}

export default function ConfigsModal({
  isOpen,
  onClose,
  onSubmit,
}: ConfigsModalProps) {
  const [configValues, setConfigValues] = useState({
    marketing: 40,
    product: 30,
    team: 20,
    financial: 10,
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (category: ConfigsCategory, value: string) => {
    const newValue = { ...configValues, [category]: value };

    const total = Object.values(newValue).reduce((sum, val) => {
      const numVal = typeof val === "string" ? parseFloat(val) || 0 : val;
      return sum + numVal;
    }, 0);

    if (total > 100) {
      setError("Total allocation cannot exceed 100%");
    } else {
      setError(null);
    }

    setConfigValues(newValue);
  };

  const handleSubmit = () => {
    const numericAllocation = Object.entries(configValues).reduce(
      (acc, [key, value]) => {
        acc[key as ConfigsCategory] =
          typeof value === "string" ? Number.parseFloat(value) || 0 : value;
        return acc;
      },
      {} as Record<ConfigsCategory, number>
    );

    const total = Object.values(numericAllocation).reduce(
      (sum, val) => sum + val,
      0
    );

    if (total !== 100) {
      setError("Total allocation must equal 100%");
    } else {
      setError(null);
      onSubmit(numericAllocation);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Evaluation Configs</h2>
        <div className="space-y-4">
          {(Object.keys(configValues) as ConfigsCategory[]).map((category) => (
            <div key={category} className="flex items-center justify-between">
              <label htmlFor={category} className="capitalize">
                {category} %
              </label>
              <input
                id={category}
                type="number"
                className="border rounded px-2 py-1 w-24"
                value={configValues[category]}
                onChange={(e) => handleInputChange(category, e.target.value)}
              />
            </div>
          ))}
        </div>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
