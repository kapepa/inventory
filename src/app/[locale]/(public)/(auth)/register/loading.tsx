import { RegisterFormSkeleton } from "@/features/auth/ui/register-form";
import { Container } from "@/shared/ui";
import { AuthGateSkeleton } from "@/widgets/auth-gate/ui/auth-gate";

export default function LoadingRegister() {
  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col justify-center items-center">
      <AuthGateSkeleton>
        <RegisterFormSkeleton />
      </AuthGateSkeleton>
    </Container>
  )
}