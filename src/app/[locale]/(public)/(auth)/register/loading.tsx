import { RegisterFormSkeleton } from "@/features/auth/ui/register-form-skeleton";
import { Container } from "@/shared/ui/container";
import { AuthGateSkeleton } from "@/widgets/auth-gate/ui/auth-gate-skeleton";

export default function LoadingRegister() {
  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col justify-center items-center">
      <AuthGateSkeleton>
        <RegisterFormSkeleton />
      </AuthGateSkeleton>
    </Container>
  )
}