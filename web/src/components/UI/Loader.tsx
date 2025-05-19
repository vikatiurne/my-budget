import React from "react";
import { RingLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ loading, size, color }) => {
  return (
    <RingLoader
      color={color ?? "#00786f"}
      loading={loading}
      cssOverride={{
        display: "block",
        margin: "0 auto",
        borderColor: "#00786f",
        paddingTop: "40px",
      }}
      size={size ?? 100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
