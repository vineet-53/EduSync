import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "../../../../../common/form";
import { IoCloudUploadSharp } from "react-icons/io5";
export default function FileUpload({ fileField }) {
  const { register } = useFormContext();
  const [File, setFile] = useState("");
  return (
    <>
      <label className="w-full h-max cursor-pointer overflow-hidden bg-custom-tertiary rounded-md my-1 grid place-items-center grid-cols-1 text-custom-secondary p-4">
        <input
          name={fileField}
          type="file"
          className="hidden w-full h-full "
          {...register(fileField, {
            required: true,
            onChange: (e) => {
              const imageBlob = e.target?.files[0];
              if (!imageBlob) {
                return;
              }
              const reader = new FileReader();
              reader.readAsDataURL(imageBlob);
              reader.onload = (e) => {
                const imageUrl = e.target?.result;
                if (!imageUrl) {
                  console.log("No image url generated reader blob");
                  return;
                }
                setFile(imageUrl);
              };
            },
          })}
        />
        {File == "" ? (
          <>
            <div className="w-max h-max p-2 border-2 border-yellow-100 rounded-full">
              <IoCloudUploadSharp className="text-xl text-yellow-100" />
            </div>
            <div className="text-center">
              <p>
                Drag and drop an image, or{" "}
                <span className="text-yellow-100">Browse</span>
              </p>
              <p>Max 6MB each (12MB for videos)</p>
            </div>
            <ul className="text-center lg:list-disc md:flex w-full justify-evenly">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </>
        ) : (
          <>
            <img src={File} style={{ aspectRatio: 16 / 9 }} />
          </>
        )}
      </label>
    </>
  );
}
