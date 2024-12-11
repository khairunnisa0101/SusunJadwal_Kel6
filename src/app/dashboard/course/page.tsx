import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CourseList from "@/components/organisms/course/CourseList";

export default function CourseDashboard() {
  return (
    <>
      <DashboardTitle title="Mata Kuliah" />
      <CourseList />
    </>
  );
}
