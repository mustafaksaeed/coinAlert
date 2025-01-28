import Input from "@mui/joy/Input";

export default function Threshold({
  onThresholdChange,
}: {
  onThresholdChange: (value: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onThresholdChange(e.target.value);
  };

  return (
    <div className="threshold">
      <label>Threshold:</label>
      <Input
        style={{ marginTop: "0.2rem", marginBottom: "0.1rem" }}
        type="number"
        id="email"
        placeholder="Enter threshold"
        onChange={handleChange}
        variant="outlined"
        size="lg"
        color="neutral"
      />
    </div>
  );
}
