import { Metadata } from "next";

const defaultMetadataValues: Metadata = {
  title: "SusunJadwal",
  description: "SusunJadwal adalah aplikasi untuk menyusun jadwal irs.",
};

export const defineMetadata = (metadata?: Metadata) => {
  const title = metadata?.title
    ? `${metadata.title} | SusunJadwal`
    : defaultMetadataValues.title;
  return {
    ...defaultMetadataValues,
    ...metadata,
    title,
  };
};
