export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container-custom py-8">
      <h1 className="text-4xl font-bold text-starlight">Vehicle Detail: {params.id}</h1>
      <p className="text-stardust mt-4">Vehicle detail page - Coming in next iteration!</p>
    </div>
  );
}
