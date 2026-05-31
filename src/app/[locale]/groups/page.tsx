
import { Container, ProfileAvatar } from "@/shared";
import { memo } from "react";

const TestCOmponent = memo(() => {
  return (
    <div className="h-48">
      <Container>
        <ProfileAvatar name="BOB" />
      </Container>
    </div>
  )
}, (prevProps, nextProps) => {
  console.log("prevProps, nextProps", prevProps, nextProps)
  return true;
})

export default function fuGroupsPage() {
  return (
    <>
      <TestCOmponent />
    </>

  );
}
