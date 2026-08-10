import { LoginFormSkeleton } from "@/features/auth/ui/login-form-skeleton";
import { AuthGateSkeleton } from "@/widgets/auth-gate/ui/auth-gate-skeleton";
import { Container } from "@/shared/ui/container";

export default function LoadingLogin() {
  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col justify-center items-center">
      <AuthGateSkeleton>
        <LoginFormSkeleton />
      </AuthGateSkeleton>
    </Container>
  )
}