export function optimizeCloudinaryImage(
  url,
  {
    width = 400,
    height = 400,
    crop = "fill",
    quality = "auto",
    format = "auto",
    dpr = "auto",
  } = {}
) {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  //split only at '/upload'
  const [prefix, suffix] = url.split("/upload");
  if (!suffix) return url;

  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `dpr_${dpr}`,
  ].join(",");

  return `${prefix}/upload/${transformations}/${suffix}`;
}
