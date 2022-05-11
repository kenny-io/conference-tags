import { Cloudinary, Transformation } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { image, text } from "@cloudinary/url-gen/qualifiers/source";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { brightness } from "@cloudinary/url-gen/actions/adjust";

export default function Tags({ formData }) {
  const { name, role, avatar } = formData;

  const cld = new Cloudinary({
    cloud: {
      cloudName: "kennyy",
    },
  });

  let baseImage = cld.image(`base-tag`);

  baseImage.overlay(
    source(
      image(`${avatar}`).transformation(
        new Transformation()
          .resize(scale().width(400).height(400))
          .roundCorners(byRadius(230))
          .adjust(brightness(5))
      )
    ).position(new Position().gravity(compass("center")).offsetY(-50))
  );
  baseImage.overlay(
    source(
      text(`${name}`, new TextStyle("Nunito", 65)).textColor("white")
    ).position(new Position().gravity(compass("center")).offsetY(210))
  );
  baseImage.overlay(
    source(
      text(`${role}`, new TextStyle("Nunito", 70)).textColor("purple")
    ).position(new Position().gravity(compass("center")).offsetY(350))
  );

  return (
    <div className="mt-5">
      <AdvancedImage cldImg={baseImage} />
    </div>
  );
}
