import { cn } from "@/lib/utils";
import * as React from "react";

function ArtifactPhoto({
  imageSrc = "https://images.metmuseum.org/CRDImages/ad/original/112937.jpg",
  className = "",
  alt = "",
  ...delegatedDivProps
}: React.ComponentProps<"div"> & {
  imageSrc?: string;
  alt?: string;
}) {
  return (
    <div
      className={cn("w-full max-w-[600px] shadow-xl", className)}
      {...delegatedDivProps}
    >
      <img className="w-full h-auto" src={imageSrc} alt={alt} />
    </div>
  );
}

export default ArtifactPhoto;
