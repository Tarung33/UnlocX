export default function DashboardCard({ title, description }) {
    return (
      <div className="dashboard-card">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p>{description}</p>
      </div>
    );
  }
  