import { AddParishButton } from "@/features";
import { Container } from "@/shared";
import { PageHeader, ParishesList } from "@/widgets";
import { fetchParishes } from "@/entities/parish";

export default async function Parishes() {
  const initialData = await fetchParishes({ page: 1, limit: 20 })

  return (
    <Container className="py-16">
      <PageHeader
        title="Приходы"
        count={initialData.total}
        action={<AddParishButton />}
      />
      <ParishesList initialParishes={initialData.data} initialHasMore={initialData.hasMore} />
    </Container>
  );
}
