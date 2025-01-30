import Papa from "papaparse";

const DownloadCSV = ({ jsonData }: any) => {
  const downloadCSV = () => {
    try {
      const csv = Papa.unparse(jsonData);

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating CSV:", err);
    }
  };
  return (
    <div>
      <button onClick={downloadCSV}> Download CSV</button>
    </div>
  );
};

export default DownloadCSV;
