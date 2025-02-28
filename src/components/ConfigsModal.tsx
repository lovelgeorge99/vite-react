import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type ConfigsCategory = "marketing" | "product" | "team" | "financial";

interface ConfigsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfigsModal({ isOpen, onClose }: ConfigsModalProps) {
  const [configValues, setConfigValues] = useState({
    marketing: 40,
    product: 30,
    team: 20,
    financial: 10,
  });
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setseletedTab] = useState("settings");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const agentId = "3dff1b35-8db0-0063-b590-e47ffe9290de";

  const sendMessageMutation = useMutation({
    mutationKey: ["send_message", agentId],
    mutationFn: ({
      message,
      selectedFile,
    }: {
      message: string;
      selectedFile?: File | null;
    }) => apiClient.sendMessage(agentId, message, selectedFile),
    onSuccess: () => {
      console.log("Updated");
    },
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Unable to send message",
        description: e.message,
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
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
      if (selectedFile) {
        sendMessageMutation.mutate({
          message: "Can you read for this csv file",
          selectedFile: selectedFile ? selectedFile : null,
        });

        setSelectedFile(null);
      } else {
        sendMessageMutation.mutate({
          message: "how many projects are there",
        });
        setError(null);
        // onSubmit(numericAllocation);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  ">
      <div className="bg-[#2F2F2F] rounded-lg p-6 w-[682px] min-h-[563px] relative ">
        <div className="flex items-center justify-between m-3">
          <h2 className="text-2xl font-bold ">Settings</h2>
          <span onClick={onClose} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 15L15 5M5 5L15 15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="grid grid-cols-4 pt-9 gap-6 border-t border-white">
          <div className="col-span-1 ">
            <div className="flex flex-col gap-4">
              <div
                className={`flex px-2 py-1 font-medium text  rounded cursor-pointer ${
                  selectedTab === "settings" ? "bg-[#3A3A3A]" : ""
                }  `}
                onClick={() => setseletedTab("settings")}
              >
                {" "}
                Key Criteria
              </div>
              <div
                className={`flex px-2 py-1 font-medium text  rounded cursor-pointer ${
                  selectedTab === "data" ? "bg-[#3A3A3A]" : ""
                }`}
                onClick={() => setseletedTab("data")}
              >
                Data
              </div>
              <div className="flex px-2 py-1 font-medium text text-[#696161]   items-center gap-1">
                {" "}
                Integrations
                <span className="text-xs rounded-xl bg-[#A8008C] text-white px-1">
                  soon
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-3 ">
            {selectedTab === "settings" ? (
              <div className="">
                {(Object.keys(configValues) as ConfigsCategory[]).map(
                  (category) => (
                    <div key={category} className="flex  flex-col gap-3 ">
                      <label
                        htmlFor={category}
                        className="text-[#889CB8] text-xs font-medium capitalize"
                      >
                        {category}
                      </label>
                      <input
                        id={category}
                        type="number"
                        className="border border-[#889CB8] rounded-xl  p-3 "
                        value={configValues[category]}
                        onChange={(e) =>
                          handleInputChange(category, e.target.value)
                        }
                      />
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="">
                <div className="flex  flex-col gap-3 ">
                  <div className="text-[#889CB8] text-xs font-medium capitalize">
                    Upload CSV
                  </div>

                  <div className="flex justify-between pl-4 border  rounded-sm border-[#889CB8] items-center h-[50px]">
                    <div>
                      <span className="text-sm">
                        {selectedFile ? "Uploaded" : "Upload your CSV here"}{" "}
                      </span>
                    </div>
                    <label
                      htmlFor="doc"
                      className="bg-[#889CB8] border-r border rounded-r-sm px-4 py-1 cursor-pointer h-full items-center flex "
                    >
                      <span className="text-sm p-6">Browse</span>
                    </label>
                  </div>
                  <input
                    id="doc"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="border border-[#889CB8] rounded-xl  p-3  "
                    hidden
                  />

                  {selectedFile ? (
                    <div className="p-3 flex">
                      <div className="relative rounded-md border p-2">
                        <Button
                          onClick={() => setSelectedFile(null)}
                          className="absolute -right-2 -top-2 size-[22px] ring-2 ring-background"
                          variant="outline"
                          size="icon"
                        >
                          <X />
                        </Button>
                        <h1>{selectedFile.name}</h1>

                        {/* <img
                          src={URL.createObjectURL(selectedFile)}
                          height="100%"
                          width="100%"
                          className="aspect-square object-contain w-16"
                        /> */}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        <div className="mt-6 flex justify-end space-x-2 ">
          <button
            className={`px-4 py-2 absolute  bottom-10 min-w-[100px] bg-[#A8008C] text-white rounded hover:bg-[#e04dc7] transition-colors ${
              sendMessageMutation?.isPending ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={sendMessageMutation?.isPending}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
