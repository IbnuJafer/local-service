import ServiceDashboard from '../components/ServiceDashboard';

export default function Home() {
  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Local Services in Arba Minch</h1>
      <ServiceDashboard />
    </div>
  );
}
