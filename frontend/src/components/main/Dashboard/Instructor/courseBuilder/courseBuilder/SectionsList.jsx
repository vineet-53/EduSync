import { nanoid } from "@reduxjs/toolkit";
import Section from "./Section.jsx";
import { useSelector } from "react-redux";
export default function SectionsList() {
  const { course } = useSelector((state) => state.course);
  return (
    <div>
      {course.sections.map((section) => {
        return <Section section={section} key={nanoid()} />;
      })}
    </div>
  );
}
