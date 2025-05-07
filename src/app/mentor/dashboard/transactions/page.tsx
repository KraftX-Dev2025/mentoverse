import MentorLayout from "@/components/mentor/MentorLayout";
import TransactionsTab from "@/components/mentor/dashboard/Transactions";

export default function MentorCoursesDashboardPage() {
  return (
    <MentorLayout>
      <TransactionsTab />
    </MentorLayout>
  );
}